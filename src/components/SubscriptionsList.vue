<template>
  <div class="app">
    <Navbar />
    <div class="List">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h3 class="text-center">Subscriptions List</h3>
          <table class="table align-middle">
            <thead>
              <tr>
                <th>Subscription</th>
                <th class="d-none d-sm-table-cell">Description</th>
                <th>Amount</th>
                <th>Frequency</th>
                <th>Date Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="subscription in Subscriptions" :key="subscription.key">
                <td>{{ subscription.name }}</td>
                <td class="d-none d-sm-table-cell">{{ subscription.description }}</td>
                <td>${{ subscription.amount }}</td>
                <td>{{ subscription.frequency }}</td>

                <!-- ✅ Show the date -->
                <td>{{ formatDate(subscription.dateStarted) }}</td>

                <!-- ✅ Buttons moved to the Actions column -->
                <td>
                  <router-link
                    :to="{ name: 'edit', params: { id: subscription.key } }"
                    class="btn btn-primary btn-sm px-3"
                  >
                    Edit
                  </router-link>
                  <button
                    @click.prevent="deleteSubscription(subscription.key)"
                    class="btn btn-danger btn-sm px-3"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <button @click="createSubscription">Add New Subscription</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar.vue'
import db from '../firebaseDb'
import { collection, onSnapshot, doc, deleteDoc, query, where } from 'firebase/firestore'

const subsCollectionRef = collection(db, 'subscriptions') // Database collection reference

export default {
  name: 'List-vue',
  components: { Navbar },
  data() {
    return {
      Subscriptions: [],
      user: ''
    }
  },
  async created() {
    this.user = JSON.parse(localStorage.getItem('log_user'))
    const q = query(subsCollectionRef, where('username', '==', this.user))
    onSnapshot(q, (snapshot) => {
      this.Subscriptions = []
      snapshot.forEach((doc) => {
        if (doc.data().name) {
          this.Subscriptions.push({
            key: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            amount: doc.data().amount,
            frequency: doc.data().frequency,
            dateStarted: doc.data().dateStarted || '', // ✅ added
            username: doc.data().username
          })
        }
      })
    })
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('log_user'))
  },
  methods: {
    deleteSubscription(id) {
      if (window.confirm('Do you really want to delete?')) {
        deleteDoc(doc(subsCollectionRef, id)).catch((error) => {
          console.error(error)
        })
      }
    },
    createSubscription() {
      this.$router.push('/create')
    },

    //  small date formatter
    formatDate(val) {
      if (!val) return ''
      if (val && typeof val === 'object' && typeof val.toDate === 'function') {
        try {
          return val.toDate().toISOString().slice(0, 10)
        } catch {
          return ''
        }
      }
      return String(val).slice(0, 10)
    }
  }
}
</script>

<style>
.app {
  max-width: 1000px;
  margin: 0 auto;
}

h3 {
  margin: 0 0 1rem;
  font-weight: 700;
}

.table {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e6e9ee;
}

.table thead {
  background-color: #42b883;
  color: #1f2a36;
  font-weight: 700;
}

.table th,
.table td {
  padding: 14px 16px;
  text-align: center;
  vertical-align: middle;
}

.btn {
  padding: 6px 10px;
  margin: 4px;
  border-radius: 10px;
  font-weight: 600;
}
/* Keep the date on one line */
.table td:nth-child(5) {
  white-space: nowrap;
}

</style>
