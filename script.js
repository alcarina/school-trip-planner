// School Trip Planner - Main JavaScript

class TripPlanner {
    constructor() {
        this.trips = this.loadTrips();
        this.editingId = null;
        this.initializeEventListeners();
        this.renderTrips();
    }

    initializeEventListeners() {
        const form = document.getElementById('tripForm');
        const cancelBtn = document.getElementById('cancelBtn');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        cancelBtn.addEventListener('click', () => {
            this.cancelEdit();
        });
    }

    handleFormSubmit() {
        const tripData = {
            id: this.editingId || Date.now().toString(),
            name: document.getElementById('tripName').value.trim(),
            destination: document.getElementById('destination').value.trim(),
            date: document.getElementById('tripDate').value,
            studentCount: parseInt(document.getElementById('studentCount').value),
            teacherCount: parseInt(document.getElementById('teacherCount').value),
            transportation: document.getElementById('transportation').value,
            costPerStudent: parseFloat(document.getElementById('costPerStudent').value) || 0,
            activities: document.getElementById('activities').value.trim(),
            notes: document.getElementById('notes').value.trim(),
            createdAt: this.editingId ? this.trips.find(t => t.id === this.editingId).createdAt : new Date().toISOString()
        };

        if (this.editingId) {
            this.updateTrip(tripData);
        } else {
            this.addTrip(tripData);
        }

        this.resetForm();
        this.saveTrips();
        this.renderTrips();
    }

    addTrip(trip) {
        this.trips.unshift(trip);
    }

    updateTrip(updatedTrip) {
        const index = this.trips.findIndex(t => t.id === updatedTrip.id);
        if (index !== -1) {
            this.trips[index] = updatedTrip;
        }
    }

    deleteTrip(id) {
        if (confirm('Are you sure you want to delete this trip?')) {
            this.trips = this.trips.filter(t => t.id !== id);
            this.saveTrips();
            this.renderTrips();
        }
    }

    editTrip(id) {
        const trip = this.trips.find(t => t.id === id);
        if (!trip) return;

        this.editingId = id;

        document.getElementById('tripName').value = trip.name;
        document.getElementById('destination').value = trip.destination;
        document.getElementById('tripDate').value = trip.date;
        document.getElementById('studentCount').value = trip.studentCount;
        document.getElementById('teacherCount').value = trip.teacherCount;
        document.getElementById('transportation').value = trip.transportation;
        document.getElementById('costPerStudent').value = trip.costPerStudent;
        document.getElementById('activities').value = trip.activities;
        document.getElementById('notes').value = trip.notes;

        document.getElementById('cancelBtn').style.display = 'inline-block';
        document.querySelector('.btn-primary').textContent = 'Update Trip';

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    cancelEdit() {
        this.editingId = null;
        this.resetForm();
    }

    resetForm() {
        document.getElementById('tripForm').reset();
        document.getElementById('cancelBtn').style.display = 'none';
        document.querySelector('.btn-primary').textContent = 'Add Trip';
        this.editingId = null;
    }

    renderTrips() {
        const tripsList = document.getElementById('tripsList');
        const tripCount = document.getElementById('tripCount');

        tripCount.textContent = `${this.trips.length} trip${this.trips.length !== 1 ? 's' : ''}`;

        if (this.trips.length === 0) {
            tripsList.innerHTML = '<p class="empty-state">No trips planned yet. Add your first trip above!</p>';
            return;
        }

        tripsList.innerHTML = this.trips.map(trip => this.createTripCard(trip)).join('');

        // Add event listeners to buttons
        this.trips.forEach(trip => {
            const editBtn = document.querySelector(`[data-edit-id="${trip.id}"]`);
            const deleteBtn = document.querySelector(`[data-delete-id="${trip.id}"]`);

            editBtn.addEventListener('click', () => this.editTrip(trip.id));
            deleteBtn.addEventListener('click', () => this.deleteTrip(trip.id));
        });
    }

    createTripCard(trip) {
        const totalCost = trip.costPerStudent * trip.studentCount;
        const totalParticipants = trip.studentCount + trip.teacherCount;
        const formattedDate = new Date(trip.date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return `
            <div class="trip-card">
                <div class="trip-header">
                    <div>
                        <div class="trip-title">${this.escapeHtml(trip.name)}</div>
                        <div class="trip-destination">📍 ${this.escapeHtml(trip.destination)}</div>
                    </div>
                    <div class="trip-actions">
                        <button class="btn-small btn-edit" data-edit-id="${trip.id}">Edit</button>
                        <button class="btn-small btn-delete" data-delete-id="${trip.id}">Delete</button>
                    </div>
                </div>

                <div class="trip-details">
                    <div class="trip-detail">
                        <div class="detail-label">Date</div>
                        <div class="detail-value">📅 ${formattedDate}</div>
                    </div>
                    <div class="trip-detail">
                        <div class="detail-label">Students</div>
                        <div class="detail-value">👨‍🎓 ${trip.studentCount}</div>
                    </div>
                    <div class="trip-detail">
                        <div class="detail-label">Teachers</div>
                        <div class="detail-value">👨‍🏫 ${trip.teacherCount}</div>
                    </div>
                    <div class="trip-detail">
                        <div class="detail-label">Total Participants</div>
                        <div class="detail-value">👥 ${totalParticipants}</div>
                    </div>
                    <div class="trip-detail">
                        <div class="detail-label">Transportation</div>
                        <div class="detail-value">🚌 ${trip.transportation}</div>
                    </div>
                    <div class="trip-detail">
                        <div class="detail-label">Cost per Student</div>
                        <div class="detail-value">💵 $${trip.costPerStudent.toFixed(2)}</div>
                    </div>
                    <div class="trip-detail">
                        <div class="detail-label">Total Cost</div>
                        <div class="detail-value">💰 $${totalCost.toFixed(2)}</div>
                    </div>
                </div>

                ${trip.activities ? `
                    <div class="trip-description">
                        <h4>Planned Activities</h4>
                        <p>${this.escapeHtml(trip.activities)}</p>
                    </div>
                ` : ''}

                ${trip.notes ? `
                    <div class="trip-description">
                        <h4>Additional Notes</h4>
                        <p>${this.escapeHtml(trip.notes)}</p>
                    </div>
                ` : ''}
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveTrips() {
        localStorage.setItem('schoolTrips', JSON.stringify(this.trips));
    }

    loadTrips() {
        const stored = localStorage.getItem('schoolTrips');
        return stored ? JSON.parse(stored) : [];
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TripPlanner();
});
