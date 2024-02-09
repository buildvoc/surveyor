import React from 'react'
import { Link } from 'react-router'

import { StyledHeader, Logo, Subtitles } from './styles'

import nypl from 'images/nypl-white.svg'

export default function Header (props) {
  return (
    <StyledHeader className='align-center'>
      <div className='align-center'>
        <Logo style={{backgroundImage: `url(${nypl})`}} href='//nypl.org' target='_blank'>
          <span>Connecting photos to Building Information</span>
        </Logo>
        <Subtitles>
          <div>
            <a href='http://nypl.org/' target='_blank'>Pic2BIM</a>
          </div>
          <div>
            <a href='http://spacetime.nypl.org/' target='_blank'>Connecting photos to Building Information</a>
          </div>
        </Subtitles>
        <h1>
          <Link to={props.homepageLink}>
            Surveyor
          </Link>
        </h1>
      </div>
      <div>
        {props.children}
      </div>
    </StyledHeader>
  )
}
