import React from 'react'
import {Routes, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import LeadCreatorHome from './screens/LeadCreatorHome'
import LeadCreateScreen from './screens/LeadCreateScreen'
import LeadManagerScreen from './screens/LeadManagerScreen'
import LeadEditScreen from './screens/LeadEditScreen'


const App = () => {
  return (
      <div>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
            <Route path="/" element={<HomeScreen/>} />
            <Route path="/leadcreatorhome" element={<LeadCreatorHome/>} />
            <Route path="/createlead" element={<LeadCreateScreen/>} />
            <Route path="/register" element={<RegisterScreen/>} />
            <Route path="/login" element={<LoginScreen/>} />
            <Route path="/leadManager" element={<LeadManagerScreen/>} />
            <Route path="/user/:id/edit" element={<LeadEditScreen/>} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
  )
}

export default App
