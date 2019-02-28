import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import ResultForm from './components/ResultForm/ResultForm.jsx';

import getSearchResult from './actions/action.js';

import './App.scss';

class App extends Component {
	constructor(props){
		super(props);
		this.search = this.search.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.handleDropdownClick = this.handleDropdownClick.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.state = {
			clickedSearch: false,
			searchByContext: '',
			searchByStar: '',
			searchByLicense: '',
			includeForked: false,
			loading: false,
		}
	}

	handleFormChange(event) {
		const { id, value } = event.target;
		this.setState({
			[id]: value,
		});
	}

	handleDropdownClick(event){
		const {id, value} = event.target.nextSibling;
		this.setState({
			[id]: value,
		});
	}

	handleCheckboxChange(event){
		const { id, checked } = event.target;		
		this.setState({
			[id]: checked,
		});
	}

	search(){
		const { dispatch } = this.props;
		this.setState({
			clickedSearch: true,
		});
		this.setState(() => {
            return { loading: true }
        });
		dispatch(getSearchResult(this.state.searchByContext, this.state.searchByStar, this.state.searchByLicense, this.state.includeForked));		
		const queryStr = encodeURIComponent(this.state.searchByContext)+'+stars'+encodeURIComponent(`:${this.state.searchByStar}`)+'+license'+encodeURIComponent(`:${this.state.searchByLicense}`)+'+fork'+encodeURIComponent(`:${this.state.includeForked}`);
		this.props.history.push('?q='+queryStr);
		setTimeout(() => {
            this.setState(() => {
                return { loading: false }
            });
        }, 1000);
	}

	render() {
		return (
			<div className="App">
				<Header />
				<div className={`${this.state.loading ? 'show' : 'hide'} overlay`}></div>
				<div className="project-name">Even Financial GitHub Repository Search</div>
				<div className="searchForm">
					<div className="input-wrapper">
						<label htmlFor="searchByContext">Text</label>
						<input 
							type="text" 
							id="searchByContext"
							value={this.state.searchByContext}
							onChange={this.handleFormChange}
						 />
					</div>
					<div className="input-wrapper">
						<label htmlFor="searchByStar">Stars</label>
						<input 
							type="text" 
							id="searchByStar" 
							value={this.state.searchByStar}
							onChange={this.handleFormChange}
						/>
					</div>
					<div className="input-wrapper">
						<label htmlFor="searchByLicense">License</label>
						<div className="license-select-container">
							<div 
								className="select-list"
								onClick={this.handleDropdownClick}
							>
								<i className="select-arrow">
								</i>
							</div>
							<select 
								id="searchByLicense"
								value={this.state.searchByLicense}
								onChange={this.handleFormChange}
							>
								<option value="Academic Free License v3.0">Academic Free License v3.0</option>
								<option value="Apache license 2.0">Apache license 2.0</option>
								<option value="Artistic license 2.0">Artistic license 2.0</option>
								<option value="Boost Software License 1.0">Boost Software License 1.0</option>
								<option value='BSD 2-clause "Simplified" license'>BSD 2-clause "Simplified" license</option>
								<option value='BSD 3-clause "New" or "Revised" license'>BSD 3-clause "New" or "Revised" license</option>
								<option value="BSD 3-clause Clear license">BSD 3-clause Clear license</option>
								<option value="Creative Commons license family">Creative Commons license family</option>
								<option value="Creative Commons Zero v1.0 Universal">Creative Commons Zero v1.0 Universal</option>
								<option value="Creative Commons Attribution 4.0">Creative Commons Attribution 4.0</option>
								<option value="Creative Commons Attribution Share Alike 4.0">Creative Commons Attribution Share Alike 4.0</option>
								<option value="Do What The F*ck You Want To Public License">Do What The F*ck You Want To Public License</option>
								<option value="Educational Community License v2.0">Educational Community License v2.0</option>
								<option value="Eclipse Public License 1.0">Eclipse Public License 1.0</option>
								<option value="European Union Public License 1.1">European Union Public License 1.1</option>
								<option value="GNU Affero General Public License v3.0">GNU Affero General Public License v3.0</option>
								<option value="GNU General Public License family">GNU General Public License family</option>
								<option value="GNU General Public License v2.0">GNU General Public License v2.0</option>
								<option value="GNU General Public License v3.0">GNU General Public License v3.0</option>
								<option value="GNU Lesser General Public License family">GNU Lesser General Public License family</option>
								<option value="GNU Lesser General Public License v2.1">GNU Lesser General Public License v2.1</option>
								<option value="GNU Lesser General Public License v3.0">GNU Lesser General Public License v3.0</option>
								<option value="ISC">ISC</option>
								<option value="LaTeX Project Public License v1.3c">LaTeX Project Public License v1.3c</option>
								<option value="Microsoft Public License">Microsoft Public License</option>
								<option value="MIT">MIT</option>
								<option value="Mozilla Public License 2.0">Mozilla Public License 2.0</option>
								<option value="Open Software License 3.0">Open Software License 3.0</option>
								<option value="PostgreSQL License">PostgreSQL License</option>
								<option value="SIL Open Font License 1.1">SIL Open Font License 1.1</option>
								<option value="University of Illinois/NCSA Open Source License">University of Illinois/NCSA Open Source License</option>
								<option value="The Unlicense">The Unlicense</option>							
								<option value="zLib License">zLib License</option>
							</select>
						</div>
					</div>
					<div className="checkbox-wrapper">
						<input 
							type="checkbox" 
							id="includeForked"
							checked={this.state.includeForked}
							onChange={this.handleCheckboxChange}
						 />
						<label htmlFor="includeForked">Include Forked</label>
					</div>
					<div className="button-wrapper">
						<button 
							className={`${this.state.loading ? 'loading' : 'search-btn'}`}
							onClick={this.search}
						>
							<span className={`${this.state.loading ? 'hide' : 'show'}`}>SEARCH</span>
						</button>
					</div>
				</div>
				<hr />
				<div className="result-title">{this.state.clickedSearch ? 'SEARCH results:' : 'Please enter query and click SEARCH button above, results appear here.'}</div>
				{ (this.props.result !== undefined) ? ( 
					this.props.result.length !== 0 ? (
						this.props.result.map((item) => {
							return (
								<ResultForm
									key={item.id}
									id={item.id}
									name={item.full_name}
									owner={item.owner.login}
									description={item.description}
									stars={item.stargazers_count}
									license={item.license!==null ? item.license.name : null}
									forks={item.forks}
								/>
							)
						})
					) : 'No result found'
				) : ''}
				<Footer />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { ...state };
}

export default withRouter(connect(mapStateToProps)(App));