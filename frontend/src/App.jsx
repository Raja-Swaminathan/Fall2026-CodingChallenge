// App.jsx
// The root component. Its only job now is routing — deciding which page
// to render based on the URL. Each page manages its own data/state.

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CollectionDetailPage from './pages/CollectionDetailPage'
import SharedCollectionPage from './pages/SharedCollectionPage'

function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections/:id" element={<CollectionDetailPage />} />
          <Route path="/shared/:token" element={<SharedCollectionPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
