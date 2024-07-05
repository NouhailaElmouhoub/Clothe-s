import React, { useState } from 'react';
import './CSS/LoginSignup.css';

function LoginSignup() {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [userList, setUserList] = useState([]);
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState({
    login: '',
    register: ''
  });

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    clearErrors(); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginCredentials({ ...loginCredentials, [name]: value });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    clearErrors(); 

    if (
      formData.name.trim() === '' ||
      formData.email.trim() === '' ||
      formData.password.trim() === ''
    ) {
      setError({ ...error, register: 'Veuillez remplir tous les champs.' });
      return;
    }

  
    if (!isValidEmail(formData.email)) {
      setError({ ...error, register: 'Veuillez entrer une adresse e-mail valide.' });
      return;
    }

    
    const existingUser = userList.find((user) => user.email === formData.email);
    if (existingUser) {
      setError({ ...error, register: 'Un compte avec cette adresse e-mail existe déjà.' });
      return;
    }

   
    setUserList([...userList, formData]);
    setFormData({ name: '', email: '', password: '' }); 
    alert('Compte créé avec succès!');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    clearErrors(); 

    const user = userList.find(
      (u) => u.email === loginCredentials.email && u.password === loginCredentials.password
    );

    if (user) {
      alert('Authentification réussie!');
    } else {
      setError({ ...error, login: 'Adresse e-mail ou mot de passe incorrect.' });
    }
  };

  const clearErrors = () => {
    setError({ login: '', register: '' });
  };

  return (
    <div className='cont'>
    <div className="container">
      <div className="tabs">
        <div
          className={`tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => handleTabClick('login')}
        >
          LogIn
        </div>
        <div
          className={`tab ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => handleTabClick('register')}
        >
          SignUp
        </div>
      </div>

      <div className="tab-content">
        {activeTab === 'login' && (
          <div>
            <label>Adresse e-mail</label>
            <input type="email" name="email" onChange={handleLoginInputChange} />
            <label>Mot de passe</label>
            <input type="password" name="password" onChange={handleLoginInputChange} />
            <button onClick={handleLoginSubmit}>Connect</button>
            {error.login && <p className="error-message">{error.login}</p>}
          </div>
        )}

        {activeTab === 'register' && (
          <div>
            <label>Nom</label>
            <input type="text" name="name" onChange={handleInputChange} />
            <label>Adresse e-mail</label>
            <input type="email" name="email" onChange={handleInputChange} />
            <label>Mot de passe</label>
            <input type="password" name="password" onChange={handleInputChange} />
            <button onClick={handleRegisterSubmit}>SignIn</button>
            {error.register && <p className="error-message">{error.register}</p>}
          </div>
        )}
      </div>
    </div></div>
  );
}

export default LoginSignup;
