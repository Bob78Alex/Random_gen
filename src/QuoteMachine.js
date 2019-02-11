import React, { Component } from 'react';

class QuoteMachine extends Component {

constructor() {
	super();
	this.state = {
		quote: {
			content: '',
			link: '',
			title: ''
		},
		hasQuote: false
	}
	this.END_POINT = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1'
}

getRandomQuote = event => {
	fetch(this.END_POINT)
	.then(response => response.json())
	.then(data => { console.log(data)
		if(data[0].content && data[0].title & data[0].link) {
			let { quote } = this.state;
			let quoteData = data[0];
			quote.content = quoteData.content;
			quote.link = quoteData.link;
			quote.title = quoteData.title;
			this.setState({ quote }, () => {
				if(this.state.hasQuote === false){
					this.setstate({ hasQuote: true})
				}
			})
		}
		else {
			return console.error('No quote has been found 404')
		}
	})
}

renderQuote = () => {
	const { title, content, link } = this.state.quote;
	return (
		<div className = "quote-result" onClick={() => this.shareOnTwitter(title, link)}>
<a href={link} target="blank">link</a>		
<h1>{title}</h1>
{JSON.stringify(content)}
<hr/>
		</div>)
}

shareOnTwitter = (text, url) => {
    window.open('http://twitter.com/share?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text), '', 'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
}

render() {
	const { hasQuote } = this.state;
	console.log(this.state);
	return (
	<div>
<h1> Quote Machine </h1>
<button onClick={this.getRandomQuote}>
  Click me to get a random quote
  </button>
  <hr/>
  {hasQuote === true ? 
  	this.renderQuote()
  	: 'no quote yet'}
   </div>
	)
}
}

export default QuoteMachine;