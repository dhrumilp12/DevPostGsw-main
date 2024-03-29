// Example data for events with images
const events = [
    { id: 1, name: 'Wine Tasting', date: '2023-04-15', image: 'wine-tasting.jpg' },
    { id: 2, name: 'Live Music Night', date: '2023-04-22', image: 'live-music.jpg' },
    { id: 3, name: 'Art Workshop', date: '2023-04-29', image: 'art-workshop.jpg' }
];

// Load events into the page
function loadEvents() {
    const eventsList = document.getElementById('events');
    const eventSelect = document.getElementById('event');

    events.forEach(event => {
        const listItem = document.createElement('div');
        listItem.className = 'list-group-item d-flex align-items-center';

        const image = document.createElement('img');
        image.src = event.image;
        image.alt = event.name;
        image.className = 'me-3';
        image.style.width = '100px';
        image.style.height = 'auto';

        const text = document.createElement('div');
        text.textContent = `${event.name} - ${event.date}`;

        listItem.appendChild(image);
        listItem.appendChild(text);
        eventsList.appendChild(listItem);

        const option = document.createElement('option');
        option.value = event.id;
        option.textContent = event.name;
        eventSelect.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', loadEvents);
