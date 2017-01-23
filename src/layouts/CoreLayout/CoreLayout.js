import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import '../../styles/core.scss'
import './CoreLayout.scss'

export const CoreLayout = ({ children }) => (
  <div className='projects-root'>
    <main>
      <Header />
      <section className='container section'>
        {children}
      </section>
      <div className='push' />
    </main>
    <Footer />
  </div>
)

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
