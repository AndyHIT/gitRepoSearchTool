const githubSearchUrl = 'https://api.github.com/search/repositories';

export const RECEIVE_RESULT = 'RECEIVE_RESULT';

function receiveResult(result){
	return {
		type: RECEIVE_RESULT,
		result
	}
}

export default function getSearchResult(text, stars, license, forked){
	return (dispatch, queryStr) => {
		queryStr = encodeURIComponent(text)+'+stars'+encodeURIComponent(`:${stars}`)+'+license'+encodeURIComponent(`:${license}`)+'+fork'+encodeURIComponent(`:${forked}`);
		fetch(githubSearchUrl+'?q='+queryStr)
			.then(response => {
				return response.json();
			})
			.then(data => {
				dispatch(receiveResult(data));
			})
			.catch(() => {
				alert('Error when retrieving the search result');
			})
	}
}
