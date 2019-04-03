import React, {useState} from 'react'
import {Global} from '@emotion/core'
import {ComponentProvider} from 'emotion-mdx'
import css from '@styled-system/css'
import Head from './head'
import components from './mdx-components'
import SidebarContent from './sidebar.mdx'
import Header from './header'
import Pagination from './pagination'
import EditLink from './edit-link'
import theme from './theme'

const styles = (
  <Global
    styles={{
      '*': {boxSizing: 'border-box'},
      body: {
        margin: 0,
        fontFamily: 'system-ui, sans-serif',
        lineHeight: 1.5,
        color: '#000',
        backgroundColor: '#fff'
      }
    }}
  />
)

const Root = props => (
  <div
    {...props}
    css={css({
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    })}
  />
)

const Main = props => (
  <main
    {...props}
    css={css({
      display: 'flex',
      flexDirection: 'column',
      minWidth: 0,
      flex: '1 1 auto',
      [theme.mediaQueries.big]: {
        flexDirection: 'row'
      }
    })}
  />
)

const Sidebar = ({open, ...props}) => (
  <div
    {...props}
    css={css({
      display: open ? 'block' : 'none',
      position: 'relative',
      maxHeight: '100vh',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      bg: 'background',
      pb: 4,
      [theme.mediaQueries.big]: {
        display: 'block',
        width: 256,
        minWidth: 0,
        flex: 'none',
        position: 'sticky',
        top: 0
      },
      ul: {
        listStyle: 'none',
        pl: 16
      },
      a: {
        display: 'block',
        color: 'inherit',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: 1,
        px: 2,
        py: 2,
        '&.active': {
          color: 'primary'
        }
      }
    })}
  />
)

const Overlay = props =>
  props.open && (
    <div
      {...props}
      css={css({
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      })}
    />
  )

const Container = props => (
  <div
    {...props}
    css={css({
      minWidth: 0,
      width: '100%',
      maxWidth: 1024,
      mx: 'auto',
      p: 4
    })}
  />
)

export default props => {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <Head />
      {styles}
      <ComponentProvider theme={theme} transform={css} components={components}>
        <Root>
          <Overlay open={menuOpen} onClick={closeMenu} />
          <Header toggleMenu={toggleMenu} />
          <Main>
            <Sidebar onClick={closeMenu} open={menuOpen}>
              <SidebarContent />
            </Sidebar>
            <Container>
              {props.children}
              <EditLink />
              <Pagination />
            </Container>
          </Main>
        </Root>
      </ComponentProvider>
    </>
  )
}
