import React, { useState } from 'react';

import Projects from './../../assets/images/starred.svg';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Container = styled.div`
  position: fixed;
  z-index: 99;
  .active {
    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
`;

const Button = styled.button`
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &::before,
  &::after {
    content: '';
    height: 2px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
  }

  &::before {
    top: ${(props) => (props.clicked ? '1.5' : '1rem')};
    transform: ${(props) => (props.clicked ? 'rotate(135deg)' : 'rotate(0)')};
  }

  &::after {
    top: ${(props) => (props.clicked ? '1.2' : '1.5rem')};
    transform: ${(props) => (props.clicked ? 'rotate(-135deg)' : 'rotate(0)')};
  }
`;

const SidebarContainer = styled.div`
  width: 3.5rem;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const SlickBar = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  position: absolute;
  left: 0;
  width: ${(props) => (props.clicked ? '9rem' : '3.5rem')};
  transition: all 0.5s ease;
`;

const Item = styled(NavLink)`
  text-decoration: none;
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;
  display: flex;
  padding-left: 1rem;
  &:hover {
    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }

  img {
    width: 1.2rem;
    height: auto;
    filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
      brightness(78%) contrast(85%);
  }
`;

const Text = styled.span`
  width: ${(props) => (props.clicked ? '100%' : '0')};
  overflow: hidden;
  margin-left: ${(props) => (props.clicked ? '1.5rem' : '0')};
  transition: all 0.3s ease;
`;

const Sidebar = ({ t }) => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const sidebarItems = [{}, {}, {}, {}, {}, {}, {}];
  return (
    <Container>
      <SidebarContainer>
        <SlickBar clicked={click}>
          <Button onClick={() => handleClick()}>Click</Button>

          {sidebarItems &&
            sidebarItems.map((item, idx) => {
              return (
                <Item
                  onClick={() => setClick(false)}
                  activeClassName="active"
                  key={idx}
                  to="/projects"
                >
                  <img src={Projects} alt="Projects" />
                  <Text clicked={click}>Projects</Text>
                </Item>
              );
            })}
        </SlickBar>
      </SidebarContainer>
    </Container>
  );
};

export default Sidebar;
