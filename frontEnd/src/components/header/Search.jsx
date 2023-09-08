import React, { useEffect, useState } from "react"
import styled from 'styled-components'
import { Link, useNavigate, useLocation } from "react-router-dom"
import axios from "axios";
import { BiSearchAlt } from 'react-icons/bi'
import { API_BASE_URL } from "../../config";

const Search = ({ CartItem, placeholder, category }) => {
	const [search, setSearch] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [category_name, setCategory] = useState("");
	const [isFocus, setFocus] = useState(false);
	const navigate = useNavigate()
	const location = useLocation()
	const url = window.location.search
	const params = new URLSearchParams(url)
	const name = params.get('name')

	const handleSearch = () => {
		var config = {
			method: 'get',
			url: `${API_BASE_URL}/product/list?name=${search}&category=${category_name}`,
			headers: {
				"Access-Control-Allow-Origin": "*"
			}
		};
		if (search.length > 3) {
			axios.defaults.withCredentials = true
			axios(config)
				.then((res) => {
					if (res.data.products.length !== 0) {
						console.log(res.data)
						// setSearchResult(res.data.categories[0].under_categories[0].products);
						// setSearchResult(res.data.categories[0].products);
						setSearchResult(res.data.products);
					} else {
						setSearchResult([])
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}

	useEffect(() => {
		setCategory(category)
		handleSearch();
	}, [search, category, isFocus]);

	useEffect(() => {
		if (name !== null) {
			setSearch(name)
		}
	}, [location]);

	const handleBlur = () => {
		setTimeout(() => {
			setFocus(false)
		}, 150);
	}

	const handleFocus = () => {
		setFocus(true)
	}

	const handleClick = () => {
		navigate(category_name !== "" ? `/search?name=${search}&category=${category_name}` : `search?name=${search}`)
	}

	const handledisplayresult = () => {

		if (search.length > 3 && isFocus) {
			if (searchResult.length !== 0) {
				return (
					<ul>
						{searchResult.slice(0, 5).map((result) => (
							// TODO demander le lien de la redirection
							<Link to={category_name !== "" ? `/search?name=${result.name}&category=${category_name}` : `search?name=${result.name}`} key={result.id} onClick={handleClick}>{result.name}</Link>
						))}
					</ul>
				)
			} else {
				return (
					<ul>
						<a>
							Aucun résultat trouvé
						</a>
					</ul>
				)
			}
		} else {
			return (
				<>
				</>
			)
		}
	}

	return (
		<>
			<SearchContainer className='search__container flex'>
				<SearchWrapper className="search-wrapper">
					<SearchBar className="search-bar ">
						<Input
							type="text"
							placeholder={placeholder}
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							onBlur={(e) => handleBlur()}
							onFocus={handleFocus}
						/>
					</SearchBar>
					<BiSearchAlt className="search-icon" onClick={handleClick}/>
					<Result className="search-results">
						{handledisplayresult()}
					</Result>
				</SearchWrapper>
			</SearchContainer>
		</>
	)
}

const SearchContainer = styled.div``
const SearchWrapper = styled.div``
const SearchBar = styled.div``
const Input = styled.input``
const Result = styled.div``

export default Search 