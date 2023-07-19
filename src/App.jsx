import { useState, useEffect } from 'react'
import { PlusIcon } from './components/icons/plus'
import { Form } from './components/form'
import { UsersList } from './components/users-list'

function App () {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState(null)
  const [formOpen, setFormOpen] = useState(false)

  // En este proyecto usé tailwind porque ví que ayuda a maquetar más rapido el css

  useEffect(() => {
    setStatus('loading')
    fetch('https://users-crud.academlo.tech/users/')
      .then(res => res.json())
      .then(json => {
        setUsers(json)
        setStatus(null)
      })
      .catch(() => setStatus('error'))
  }, [])

  const addUser = (user) => {
    setUsers(prev => [user, ...prev])
  }

  return (
    <>
      <main className='bg-white max-w-[1200px] m-auto py-14 px-10 min-h-[90vh] w-full'>

        <header className='flex w-full justify-between flex-col sm:flex-row gap-y-2'>
          <h1 className='text-black text-5xl font-bold'>Usuarios</h1>
          <button onClick={() => setFormOpen(true)} className='flex py-2 px-4 gap-x-2 bg-sky-900 text-white rounded-sm items-center hover:bg-sky-400 hover:text-black transition-colors'>
            <PlusIcon />
            <span>Crear un nuevo usuario</span>
          </button>
        </header>

        <UsersList users={users} setUsers={setUsers} parentStatus={status} />
      </main>
      {
        formOpen && <Form closeModal={() => setFormOpen(false)} addUser={addUser} />
      }
    </>
  )
}

export default App
