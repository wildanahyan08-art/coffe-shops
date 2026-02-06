import React, { useState, useEffect } from 'react';
import './App.css';

// Tipe data untuk item menu
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: 'coffee' | 'non-coffee' | 'food';
  image: string;
}

// Tipe data untuk form kontak
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Komponen utama aplikasi
const App: React.FC = () => {
  // State untuk menu mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  // State untuk kategori menu yang aktif
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // State untuk data form kontak
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Data menu
  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Espresso",
      description: "Kopi murni ekstrak biji kopi pilihan dengan rasa kuat dan aroma khas.",
      price: "25.000",
      category: "coffee",
      image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      name: "Cappuccino",
      description: "Perpaduan espresso, susu steamed, dan busa susu dengan taburan coklat.",
      price: "30.000",
      category: "coffee",
      image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 3,
      name: "Latte Art",
      description: "Espresso dengan susu steamed dan seni latte yang indah di atasnya.",
      price: "32.000",
      category: "coffee",
      image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 4,
      name: "Matcha Latte",
      description: "Minuman hijau dari bubuk matcha premium dicampur susu steamed.",
      price: "28.000",
      category: "non-coffee",
      image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 5,
      name: "Chocolate Mint",
      description: "Coklat panas dengan sentuhan mint yang menyegarkan.",
      price: "26.000",
      category: "non-coffee",
      image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 6,
      name: "Croissant",
      description: "Roti pastry renyah dengan isian coklat atau keju.",
      price: "22.000",
      category: "food",
      image: "https://images.unsplash.com/photo-1555507036-ab794f27d2e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 7,
      name: "Avocado Toast",
      description: "Roti panggang dengan topping alpukat, tomat cherry, dan biji wijen.",
      price: "35.000",
      category: "food",
      image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 8,
      name: "Americano",
      description: "Espresso dengan tambahan air panas, cocok untuk penikmat kopi hitam.",
      price: "24.000",
      category: "coffee",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];
  
  // Filter menu berdasarkan kategori
  const filteredMenuItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);
  
  // Handle toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Handle perubahan kategori menu
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  
  // Handle perubahan form kontak
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  // Handle submit form kontak
  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi sederhana
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      alert('Harap lengkapi semua field!');
      return;
    }
    
    // Simulasi pengiriman data
    alert(`Terima kasih ${contactForm.name}! Pesan Anda telah dikirim. Kami akan membalas ke email ${contactForm.email} segera.`);
    
    // Reset form
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };
  
  // Smooth scroll ke section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetTop = elementTop - 80;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };
  
  // Efek untuk menutup mobile menu saat resize window
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="App" style={{ width: '100%' }}>
      {/* Header & Navigasi */}
      <header className="header" style={{ width: '100%' }}>
        <div className="container header-container" style={{ width: '100%' }}>
          <div className="logo">
            <i className="fas fa-coffee"></i>
            <span>Brew & Bean</span>
          </div>
          
          <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
            <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </button>
          
          <nav className={`main-nav ${isMobileMenuOpen ? 'active' : ''}`}>
            <ul>
              <li>
                <a href="#home" onClick={(e) => { 
                  e.preventDefault(); 
                  scrollToSection('home'); 
                }} className="active">
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" onClick={(e) => { 
                  e.preventDefault(); 
                  scrollToSection('menu'); 
                }}>
                  Menu
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => { 
                  e.preventDefault(); 
                  scrollToSection('about'); 
                }}>
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { 
                  e.preventDefault(); 
                  scrollToSection('contact'); 
                }}>
                  Kontak
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home" style={{ width: '100%' }}>
        <div className="container" style={{ width: '100%' }}>
          <h1 className="fade-in">Kopi Terbaik untuk Hari Terbaik</h1>
          <p className="fade-in">
            Temukan cita rasa kopi premium dengan racikan khusus dari biji kopi pilihan terbaik. 
            Nikmati suasana nyaman dan teman terbaik di Brew & Bean Coffee Shop.
          </p>
          <a 
            href="#menu" 
            className="btn fade-in" 
            onClick={(e) => { 
              e.preventDefault(); 
              scrollToSection('menu'); 
            }}
          >
            Lihat Menu
          </a>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" style={{ width: '100%' }}>
        <div className="container" style={{ width: '100%' }}>
          <h2>Menu Kami</h2>
          
          <div className="menu-categories">
            <button 
              className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`} 
              onClick={() => handleCategoryChange('all')}
            >
              Semua
            </button>
            <button 
              className={`category-btn ${activeCategory === 'coffee' ? 'active' : ''}`} 
              onClick={() => handleCategoryChange('coffee')}
            >
              Kopi
            </button>
            <button 
              className={`category-btn ${activeCategory === 'non-coffee' ? 'active' : ''}`} 
              onClick={() => handleCategoryChange('non-coffee')}
            >
              Non-Kopi
            </button>
            <button 
              className={`category-btn ${activeCategory === 'food' ? 'active' : ''}`} 
              onClick={() => handleCategoryChange('food')}
            >
              Makanan
            </button>
          </div>
          
          <div className="menu-items" style={{ width: '100%' }}>
            {filteredMenuItems.length === 0 ? (
              <p className="loading">Menu tidak tersedia untuk kategori ini.</p>
            ) : (
              filteredMenuItems.map(item => (
                <div className="menu-item fade-in" key={item.id} style={{ width: '100%' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%' }} />
                  <div className="menu-item-content">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <div className="price">Rp {item.price}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ width: '100%' }}>
        <div className="container" style={{ width: '100%' }}>
          <h2>Tentang Kami</h2>
          <div className="about-content" style={{ width: '100%' }}>
            <div className="about-text">
              <p>
                Brew & Bean Coffee Shop didirikan pada tahun 2015 dengan satu misi sederhana: 
                menyajikan kopi terbaik dengan pengalaman terbaik untuk para pecinta kopi.
              </p>
              <p>
                Kami memilih biji kopi terbaik dari berbagai penjuru Indonesia, dipanggang dengan 
                sempurna untuk menghadirkan cita rasa yang unik dan tak terlupakan.
              </p>
              <p>
                Selain kopi, kami juga menyajikan berbagai minuman non-kopi dan makanan ringan 
                yang lezat, cocok untuk teman bersantai atau bekerja.
              </p>
              <p>
                Suasana nyaman dengan desain interior yang hangat menjadikan Brew & Bean tempat 
                ideal untuk bertemu teman, bekerja, atau sekedar menikmati waktu sendiri.
              </p>
            </div>
            <div className="about-image" style={{ width: '100%' }}>
              <img 
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Interior Coffee Shop" 
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ width: '100%' }}>
        <div className="container" style={{ width: '100%' }}>
          <h2>Hubungi Kami</h2>
          <div className="contact-container" style={{ width: '100%' }}>
            <div className="contact-info">
              <h3>Informasi Kontak</h3>
              <div className="contact-detail">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h4>Alamat</h4>
                  <p>Jl. Aroma Kopi No. 123, Jakarta Pusat</p>
                </div>
              </div>
              <div className="contact-detail">
                <i className="fas fa-phone"></i>
                <div>
                  <h4>Telepon</h4>
                  <p>(021) 1234-5678</p>
                </div>
              </div>
              <div className="contact-detail">
                <i className="fas fa-envelope"></i>
                <div>
                  <h4>Email</h4>
                  <p>info@brewnbean.com</p>
                </div>
              </div>
              <div className="contact-detail">
                <i className="fas fa-clock"></i>
                <div>
                  <h4>Jam Operasional</h4>
                  <p>Senin - Minggu: 07:00 - 22:00 WIB</p>
                </div>
              </div>
              
              <div className="social-icons">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-whatsapp"></i></a>
              </div>
            </div>
            
            <div className="contact-form">
              <h3>Kirim Pesan</h3>
              <form onSubmit={handleSubmitContact}>
                <div className="form-group">
                  <label htmlFor="name">Nama Lengkap</label>
                  <input 
                    type="text" 
                    id="name" 
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subjek</label>
                  <input 
                    type="text" 
                    id="subject" 
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Pesan</label>
                  <textarea 
                    id="message" 
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn">Kirim Pesan</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ width: '100%' }}>
        <div className="container" style={{ width: '100%' }}>
          <div className="footer-content" style={{ width: '100%' }}>
            <div className="footer-column">
              <h3>Brew & Bean</h3>
              <p>
                Kopi terbaik untuk hari terbaik. Temukan pengalaman menikmati kopi 
                yang tak terlupakan bersama kami.
              </p>
            </div>
            <div className="footer-column">
              <h3>Menu Cepat</h3>
              <ul>
                <li>
                  <a 
                    href="#home" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      scrollToSection('home'); 
                    }}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a 
                    href="#menu" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      scrollToSection('menu'); 
                    }}
                  >
                    Menu
                  </a>
                </li>
                <li>
                  <a 
                    href="#about" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      scrollToSection('about'); 
                    }}
                  >
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      scrollToSection('contact'); 
                    }}
                  >
                    Kontak
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Jam Buka</h3>
              <p>Setiap Hari: 07:00 - 22:00 WIB</p>
              <p>Weekend: 07:00 - 23:00 WIB</p>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2023 Brew & Bean Coffee Shop. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;