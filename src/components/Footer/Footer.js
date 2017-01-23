import React from 'react'
import './Footer.scss'

export const Footer = () =>
  <footer className='footer'>
    <div className='container'>
      <div className='content has-text-centered'>
        <p>
          Copyright &copy; {new Date().getFullYear()}&nbsp;
          <a href='https://daniel.escobedo.io/blog/'>Daniel Escobedo</a>. All rights reserved.
        </p>
        <p>
          <a className='icon' href='https://github.com/mrboomer/personal-projects' target='_blank'>
            <i className='fa fa-github' />
          </a>
        </p>
      </div>
    </div>
  </footer>

export default Footer
