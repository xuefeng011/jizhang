import React, { Component } from 'react'


import { Tab, TabBar, TabBarItem, TabBody, TabBarIcon, TabBarLabel, Article } from 'react-weui';


import icon1 from './1.png';
import icon2 from './2.png';
import icon3 from './3.png';
import icon4 from './4.png';


class Foot extends Component {
    state = {
        tab: 0
    };

    constructor(props) {
        super(props)
        console.log(props)
    }

    render() {
        return (
            <Tab>
                <TabBody>
                    <Article style={{
                display: this.state.tab == 0 ? null : 'none'
            }}>
                        <h1>Page 1</h1>
                        <section>
                            <h2 className="title">Heading</h2>
                            <section>
                                <h3>1.1 Title</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. Duis aute</p>
                            </section>
                        </section>
                    </Article>
                    <Article style={{
                display: this.state.tab == 1 ? null : 'none'
            }}>
                        <h1>Page 2</h1>
                        <section>
                            <h2 className="title">Heading</h2>
                            <section>
                                <h3>2.1 Title</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. Duis aute</p>
                            </section>
                        </section>
                    </Article>
                    <Article style={{
                display: this.state.tab == 2 ? null : 'none'
            }}>
                        <h1>Page 3</h1>
                        <section>
                            <h2 className="title">Heading</h2>
                            <section>
                                <h3>3.1 Title</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. Duis aute</p>
                            </section>
                        </section>
                    </Article>
                    <Article style={{
                display: this.state.tab == 3 ? null : 'none'
            }}>
                        <h1>Page 4</h1>
                        <section>
                            <h2 className="title">Heading</h2>
                            <section>
                                <h3>4.1 Title</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. Duis aute</p>
                            </section>
                        </section>
                    </Article>
                </TabBody>
                <TabBar>
                    <TabBarItem
            active={this.state.tab == 0}
            onClick={() => this.setState({
                tab: 0
            })}
            icon={<img src={icon1}/>}
            label="Tab1"
            />
                    <TabBarItem active={this.state.tab == 1} onClick={() => this.setState({
                tab: 1
            })}>
                        <TabBarIcon>
                            <img src={icon2}/>
                        </TabBarIcon>
                        <TabBarLabel>Tab2</TabBarLabel>
                    </TabBarItem>
                    <TabBarItem
            active={this.state.tab == 2}
            onClick={() => this.setState({
                tab: 2
            })}
            icon={<img src={icon3}/>}
            label="Tab3"
            />
                    <TabBarItem
            active={this.state.tab == 3}
            onClick={() => this.setState({
                tab: 3
            })}
            icon={<img src={icon4}/>}
            label="Tab4"
            />
                </TabBar>
            </Tab>
        );
    }
}

Foot.propTypes = {

}

Foot.defaultProps = {

}

export default Foot