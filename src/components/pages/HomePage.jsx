import React from 'react'

import bannerImg from 'src/assets/images/banner.jpg'

const HomePage = () => (
		<div>
				<h2>An application to save and share your favorite blogs.</h2>
				<p>By <b>Giacomo Mariani</b>.</p>
				<p>
					<a href="https://fi.linkedin.com/in/giacomo-mariani">Linkedin</a>,&nbsp;
					<a href="https://www.medium.com/@giacomo-mariani">Medium</a>,&nbsp;
					<a href="https://github.com/MarianiGiacomo/favoriteblogs">GitHub</a>
				</p>
				<img className="banner" src={bannerImg} alt="Banner image" width="1215" height="810"/>
		</div>
	)

export default HomePage

