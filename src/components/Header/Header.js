import React from 'react'
import { IndexLink } from 'react-router'
import NavLink from '../../containers/NavLink'
import './Header.scss'

export const Header = (props) =>
  <header className='hero is-primary'>

    <div className='hero-head'>
      <header className='nav'>
        <div className='container'>
          <div className='nav-left'>
            <a className='nav-item'>
              <span className='title is-4 is-unselectable'>Daniel Escobedo</span>
            </a>
          </div>
          <span className='nav-toggle'>
            <span />
            <span />
            <span />
          </span>
          <div className='nav-right nav-menu'>
            <IndexLink to='/' className='nav-item' activeClassName='is-active'>
              Projects
            </IndexLink>
            <a className='nav-item' href='https://daniel.escobedo.io/blog'>
              Blog
            </a>
            <span className='nav-item'>
              <a className='button is-primary is-inverted'
                href='https://github.com/mrboomer/personal-projects' target='_blank'>
                <span className='icon'>
                  <i className='fa fa-github' />
                </span>
                <span>View Source</span>
              </a>
            </span>
          </div>
        </div>
      </header>
    </div>

    <div className='hero-body'>
      <div className='container has-text-centered'>
        <h1 className='title'>
          Projects
        </h1>
      </div>
    </div>

    <div className='hero-foot'>
      <div className='container'>
        <nav className='tabs is-boxed'>
          <ul>
            <NavLink to='/'>Overview</NavLink>
            <NavLink to='/firebase-chat'>Firebase Chat</NavLink>
          </ul>
        </nav>
      </div>
    </div>
  </header>

export default Header
