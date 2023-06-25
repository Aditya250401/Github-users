import React from 'react'
import styled from 'styled-components'
import { GithubContext } from '../context/context'
import { Pie, Column, Bar, Doughnut } from './Charts'
const Repos = () => {
	const { repos } = React.useContext(GithubContext)

	// Calculate the number of repositories and total stars per programming language
	const languages = repos.reduce((total, item) => {
		// Destructure the language and stargazers_count properties from the current item
		const { language, stargazers_count } = item

		// If the language is not defined, skip to the next iteration
		if (!language) return total

		// Check if the language already exists in the total object
		if (!total[language]) {
			// If the language doesn't exist, create a new entry with initial values
			total[language] = { label: language, value: 1, stars: stargazers_count }
		} else {
			// If the language already exists, update the values
			total[language] = {
				...total[language],
				value: total[language].value + 1,
				stars: total[language].stars + stargazers_count,
			}
		}

		return total
	}, {})

	// Sort the languages by the number of repositories (descending order) and select the top 5
	const mostUsed = Object.values(languages)
		.sort((a, b) => {
			return b.value - a.value
		})
		.slice(0, 5)

	// Sort the languages by the total stars (descending order), update the value key, and select the top 5
	const mostPopular = Object.values(languages)
		.sort((a, b) => {
			return b.stars - a.stars
		})
		.map((item) => {
			return { ...item, value: item.stars }
		})
		.slice(0, 5)

	// Initialize variables to store the repositories with the highest stars and forks
	let { stars, forks } = repos.reduce(
		(total, item) => {
			// Destructure the stargazers_count, name, and forks properties from the current item
			const { stargazers_count, name, forks } = item

			// Create entries in the stars object using stargazers_count as the key
			total.stars[stargazers_count] = { label: name, value: stargazers_count }

			// Create entries in the forks object using forks as the key
			total.forks[forks] = { label: name, value: forks }

			return total
		},
		{
			stars: {},
			forks: {},
		}
	)

	// Extract the values from the stars object, sort them in ascending order, and select the top 5
	stars = Object.values(stars).slice(-5).reverse()

	// Extract the values from the forks object, sort them in ascending order, and select the top 5
	forks = Object.values(forks).slice(-5).reverse()

	return (
		<section className="section">
			<Wrapper className="section-center">
				<Pie data={mostUsed} />
				<Column data={stars} />
				<Doughnut data={mostPopular} />
				<Bar data={forks} />
			</Wrapper>
		</section>
	)
}

const Wrapper = styled.div`
	display: grid;
	justify-items: center;
	gap: 2rem;
	@media (min-width: 800px) {
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: 1200px) {
		grid-template-columns: 2fr 3fr;
	}

	div {
		width: 100% !important;
	}
	.fusioncharts-container {
		width: 100% !important;
	}
	svg {
		width: 100% !important;
		border-radius: var(--radius) !important;
	}
`

export default Repos
