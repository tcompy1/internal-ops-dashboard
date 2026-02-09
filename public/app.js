const API_URL = '/api/requests';

async function fetchRequests() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    const list = document.getElementById('requests-list');
    list.innerHTML = '';

    if (data.length === 0) {
      list.innerHTML = '<li>No requests yet.</li>';
      return;
    }

    data.forEach(r => {
      const li = document.createElement('li');
      li.textContent = `${r.id}: ${r.title} [${r.status}]`;
      list.appendChild(li);
    });
  } catch (err) {
    console.error('Error fetching requests:', err);
  }
}

// Refresh button
document.getElementById('refresh').addEventListener('click', fetchRequests);

// Form submit
document.getElementById('new-request-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();

  if (!title) return alert('Title is required');

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });

    document.getElementById('title').value = '';
    document.getElementById('description').value = '';

    fetchRequests(); // Update list after adding
  } catch (err) {
    console.error('Error adding request:', err);
  }
});

// Initial load
fetchRequests();
