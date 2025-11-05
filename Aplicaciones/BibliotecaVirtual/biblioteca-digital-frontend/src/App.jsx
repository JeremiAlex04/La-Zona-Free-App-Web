import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Heart, User, Moon, Sun, LogOut, LogIn, X, ChevronLeft } from 'lucide-react';
import './App.css'
const API_BASE = 'https://www.googleapis.com/books/v1/volumes';

function App() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [authForm, setAuthForm] = useState({ email: '', password: '', name: '' });
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedFavorites = localStorage.getItem('favorites');
    const savedTheme = localStorage.getItem('darkMode');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedTheme) setDarkMode(savedTheme === 'true');
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, user]);

  const searchBooks = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setSearched(true);
    try {
      const response = await fetch(`${API_BASE}?q=${encodeURIComponent(searchQuery)}&maxResults=20`);
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
    }
    setLoading(false);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchBooks();
    }
  };

  const handleAuth = () => {
    if (!authForm.email || !authForm.password) return;
    
    if (authMode === 'login') {
      const mockUser = { id: 1, name: authForm.name || authForm.email.split('@')[0], email: authForm.email };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } else {
      if (!authForm.name) return;
      const mockUser = { id: 1, name: authForm.name, email: authForm.email };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    }
    setShowAuth(false);
    setAuthForm({ email: '', password: '', name: '' });
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    localStorage.removeItem('user');
    localStorage.removeItem('favorites');
  };

  const toggleFavorite = (book) => {
    if (!user) {
      alert('Debes iniciar sesión para guardar favoritos');
      return;
    }
    
    const bookData = {
      id: book.id,
      volumeInfo: book.volumeInfo
    };

    const isFav = favorites.some(fav => fav.id === book.id);
    if (isFav) {
      setFavorites(favorites.filter(fav => fav.id !== book.id));
    } else {
      setFavorites([...favorites, bookData]);
    }
  };

  const isFavorite = (bookId) => favorites.some(fav => fav.id === bookId);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  };

  const BookCard = ({ book }) => {
    const info = book.volumeInfo;
    return (
      <div className={`book-card ${darkMode ? 'dark' : ''}`} onClick={() => setSelectedBook(book)}>
        <div className="book-image">
          {info.imageLinks?.thumbnail ? (
            <img src={info.imageLinks.thumbnail} alt={info.title} />
          ) : (
            <div className="no-image"><BookOpen size={48} /></div>
          )}
          <button 
            className={`favorite-btn ${isFavorite(book.id) ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); toggleFavorite(book); }}
          >
            <Heart size={20} fill={isFavorite(book.id) ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="book-info">
          <h3>{info.title}</h3>
          <p className="author">{info.authors?.join(', ') || 'Autor desconocido'}</p>
          <p className="description">{info.description ? info.description.substring(0, 100) + '...' : 'Sin descripción'}</p>
        </div>
      </div>
    );
  };

  const BookDetail = ({ book }) => {
    const info = book.volumeInfo;
    return (
      <div className="modal-overlay" onClick={() => setSelectedBook(null)}>
        <div className={`modal-content ${darkMode ? 'dark' : ''}`} onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={() => setSelectedBook(null)}><X /></button>
          <div className="detail-content">
            <div className="detail-image">
              {info.imageLinks?.thumbnail ? (
                <img src={info.imageLinks.thumbnail.replace('http:', 'https:')} alt={info.title} />
              ) : (
                <div className="no-image-large"><BookOpen size={120} /></div>
              )}
            </div>
            <div className="detail-info">
              <h2>{info.title}</h2>
              <p className="author-detail">{info.authors?.join(', ') || 'Autor desconocido'}</p>
              
              {info.publishedDate && (
                <p><strong>Fecha de publicación:</strong> {info.publishedDate}</p>
              )}
              {info.publisher && (
                <p><strong>Editorial:</strong> {info.publisher}</p>
              )}
              {info.industryIdentifiers && info.industryIdentifiers[0] && (
                <p><strong>ISBN:</strong> {info.industryIdentifiers[0].identifier}</p>
              )}
              
              <div className="description-full">
                <strong>Descripción:</strong>
                <p>{info.description || 'No hay descripción disponible'}</p>
              </div>
              
              <div className="detail-actions">
                <button 
                  className={`btn-favorite ${isFavorite(book.id) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(book)}
                >
                  <Heart size={20} fill={isFavorite(book.id) ? 'currentColor' : 'none'} />
                  {isFavorite(book.id) ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
                </button>
                {info.previewLink && (
                  <a href={info.previewLink} target="_blank" rel="noopener noreferrer" className="btn-preview">
                    Ver vista previa
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <BookOpen size={32} />
            <h1>Biblioteca Digital</h1>
          </div>
          <div className="header-actions">
            <button onClick={toggleTheme} className="icon-btn">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {user ? (
              <>
                <button onClick={() => setShowFavorites(!showFavorites)} className="icon-btn">
                  <Heart size={20} />
                  {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
                </button>
                <div className="user-menu">
                  <button className="icon-btn">
                    <User size={20} />
                  </button>
                  <span>{user.name}</span>
                  <button onClick={logout} className="icon-btn" title="Cerrar sesión">
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <button onClick={() => setShowAuth(true)} className="btn-login">
                <LogIn size={20} />
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        {!showFavorites ? (
          <>
            <section className="search-section">
              <h2>Descubre tu próxima lectura</h2>
              <div className="search-form">
                <div className="search-input-group">
                  <Search size={20} />
                  <input
                    type="text"
                    placeholder="Buscar por título, autor o ISBN..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                  />
                </div>
                <button onClick={searchBooks} className="btn-search" disabled={loading}>
                  {loading ? 'Buscando...' : 'Buscar'}
                </button>
              </div>
            </section>

            <section className="books-section">
              {loading ? (
                <div className="loading">Cargando libros...</div>
              ) : books.length > 0 ? (
                <div className="books-grid">
                  {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              ) : searched ? (
                <div className="no-results">
                  <BookOpen size={64} />
                  <p>No se encontraron resultados</p>
                </div>
              ) : (
                <div className="welcome">
                  <BookOpen size={64} />
                  <p>Comienza buscando tus libros favoritos</p>
                </div>
              )}
            </section>
          </>
        ) : (
          <section className="favorites-section">
            <div className="favorites-header">
              <button onClick={() => setShowFavorites(false)} className="back-btn">
                <ChevronLeft size={20} /> Volver
              </button>
              <h2>Mis Favoritos ({favorites.length})</h2>
            </div>
            {favorites.length > 0 ? (
              <div className="books-grid">
                {favorites.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="no-favorites">
                <Heart size={64} />
                <p>No tienes libros favoritos todavía</p>
              </div>
            )}
          </section>
        )}
      </main>

      {selectedBook && <BookDetail book={selectedBook} />}

      {showAuth && (
        <div className="modal-overlay" onClick={() => setShowAuth(false)}>
          <div className={`auth-modal ${darkMode ? 'dark' : ''}`} onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowAuth(false)}><X /></button>
            <h2>{authMode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}</h2>
            <div className="auth-form">
              {authMode === 'register' && (
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={authForm.name}
                  onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
                />
              )}
              <input
                type="email"
                placeholder="Email"
                value={authForm.email}
                onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={authForm.password}
                onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
              />
              <button onClick={handleAuth} className="btn-submit">
                {authMode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
              </button>
            </div>
            <p className="auth-toggle">
              {authMode === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
              <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}>
                {authMode === 'login' ? 'Regístrate' : 'Inicia sesión'}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;