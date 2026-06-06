// Protected admin page — auth-guarded message inbox with view modal and delete functionality
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../lib/supabaseClient'
import MessageModal from '../components/MessageModal'
import './BackOffice.css'

function BackOffice() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedMessage, setSelectedMessage] = useState(null)

  const navigate = useNavigate()

  // ── On mount: auth check first, then fetch messages ────────────────────────
  useEffect(() => {
    async function initPage() {
      // Step 1 — Guard: Supabase client unavailable (env vars missing)
      if (!supabase) {
        setError('Configuration error.')
        setLoading(false)
        return
      }

      // Step 1 — Auth check: unauthenticated visitors get redirected to /login
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        navigate('/login')
        return
      }

      // Step 2 — Fetch all messages, newest first
      const { data, error: fetchError } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) {
        setError('Failed to load messages. Please try again.')
      } else {
        setMessages(data)
      }

      setLoading(false)
    }

    initPage()
  }, []) // Empty array — runs once on mount only

  // ── Delete a message by id — removes the row from local state on success ──
  async function handleDelete(id) {
    const { error: deleteError } = await supabase
      .from('messages')
      .delete()
      .eq('id', id)

    if (deleteError) {
      // Log only — no full UI error banner for individual delete failures
      console.error('Delete failed:', deleteError.message)
    } else {
      // Optimistically remove the deleted row from the local state immediately
      setMessages((prev) => prev.filter((msg) => msg.id !== id))
      // If the deleted message is currently open in the modal, close it
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null)
      }
    }
  }

  // ── Logout — sign out of Supabase and redirect to the public home page ──
  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="backoffice">

      {/* ── Header bar — heading on left, logout on right ── */}
      <header className="backoffice__header">
        <h1 className="backoffice__title">📬 Message Inbox</h1>
        <button
          type="button"
          className="backoffice__logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      {/* ── Main content area ── */}
      <main className="backoffice__content">

        {/* Loading state */}
        {loading && (
          <p className="backoffice__loading">Loading messages...</p>
        )}

        {/* Error state */}
        {!loading && error && (
          <p className="backoffice__error">⚠ {error}</p>
        )}

        {/* Loaded with no error */}
        {!loading && !error && (
          <>
            {messages.length === 0 ? (
              <p className="backoffice__empty">No messages yet.</p>
            ) : (
              // Wrapped in overflow-x: auto so the table scrolls horizontally on mobile
              <div className="backoffice__table-wrap">
                <table className="backoffice__table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg) => (
                      // Clicking anywhere on the row opens the view modal
                      <tr
                        key={msg.id}
                        onClick={() => setSelectedMessage(msg)}
                      >
                        <td>{msg.name}</td>
                        <td>{msg.email}</td>
                        <td>{new Date(msg.created_at).toLocaleString()}</td>
                        <td>
                          {/*
                            stopPropagation on the actions cell prevents the row's
                            onClick from also firing when clicking a button.
                          */}
                          <div
                            className="backoffice__actions"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              className="backoffice__btn backoffice__btn--view"
                              onClick={() => setSelectedMessage(msg)}
                            >
                              View
                            </button>
                            <button
                              type="button"
                              className="backoffice__btn backoffice__btn--delete"
                              onClick={() => handleDelete(msg.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>

      {/* Modal renders above everything — null message means it stays hidden */}
      <MessageModal
        message={selectedMessage}
        onClose={() => setSelectedMessage(null)}
      />
    </div>
  )
}

export default BackOffice
