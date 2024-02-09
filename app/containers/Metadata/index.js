import React from 'react'
import { connect } from 'react-redux'

import { createSelector } from 'reselect'

import {
  selectItem,
  selectCurrentStep,
  selectShowMetadata,
  selectHasTouch
} from 'containers/App/selectors'

import { Container, Title, Field, Toggle } from './styles'

import iconLocation from 'images/icon-location.svg'
import iconDate from 'images/icon-date.svg'

export class Metadata extends React.Component {

  render () {
    if (!this.props.item.data) {
      return <div />
    }

    const show = this.props.showMetadata

    const itemData = (this.props.item && this.props.item.data) || {}

    const maxTitleLength = 120
    // Break long titles on first space before maxTitleLength
    let title = itemData.title || ''
    if (title.length > maxTitleLength) {
      for (var i = maxTitleLength; i > 0; i--) {
        if (title[i] === ' ') {
          title = title.slice(0, i) + '…'
          break
        }
      }
    }

    let metadata = [
      <Title long={title.length > 80} title={itemData.title}
        tabIndex={0} onKeyPress={this.handleKeyPress.bind(this)}>
        {title}
      </Title>,
      <Field>
        View in high resolution
        in <a target='_blank' href={`https://buildingshistory.co.uk/images/${this.props.item.id}`}>
        Pic2BIM
        </a>
      </Field>
    ]

    if (itemData.location) {
      metadata.push(
        <Field>
          <img title='Location' alt='Location of this item' src={iconLocation} /> <small>{itemData.long_description}</small>
        </Field>
      )
    }

    if (itemData.date) {
      const dateOptions = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
      metadata.push(
        <Field><img title='Date' alt='Date or year of this item' src={iconDate} /> <small>{new Date(itemData.date).toLocaleDateString('en-US', dateOptions)}</small></Field>
      )
    }

    const hiddenText = `Metadata hidden — ${this.props.hasTouch ? 'tap' : 'click'} image to show`

    return (
      <Container>
        <Toggle show={!show}>
          <div style={{opacity: 0.7}}>
            <span
              tabIndex={0} onClick={this.props.toggleMetadata} onKeyPress={this.handleKeyPress.bind(this)}>
              {hiddenText}
            </span>
          </div>
        </Toggle>
        <Toggle show={show}>
          {metadata.map((item, index) => <div key={index}>{item}</div>)}
        </Toggle>
      </Container>
    )
  }

  handleKeyPress (event) {
    if (event.key === 'Enter') {
      this.props.toggleMetadata()
    }
  }
}

export default connect(createSelector(
  selectItem(),
  selectCurrentStep(),
  selectShowMetadata(),
  selectHasTouch(),
  (item, currentStep, showMetadata, hasTouch) => ({
    item, currentStep, showMetadata, hasTouch
  })
))(Metadata)
