import React, { Component } from 'react';
import DatasetSummary from '../../Components/Dataset/DatasetSummary';
import './SearchResults.css';

class SearchResults extends Component {
  constructor(props) {
    super(props);
  }

  getSummaryText(){
    if(this.props.searchResults.length){
      if(this.props.strategy === 'match-part'){
        return (
          <div className='search-recomendations__count'>
            The following {this.props.totalNumberOfResults} datasets match some but not all of your search criteria
          </div>);
      }
    }
    return null;
  }

  render() {
    return (
      <div className='search-results'>
        {this.getSummaryText()}
        <ul className='mui-list--unstyled'>
        {
          this.props.searchResults.map((result, i)=>
            <li key={result.identifier} className='search-results__result'>
              <DatasetSummary dataset={result}/>
            </li>
          )
        }
        </ul>
      </div>

    );
  }
}

SearchResults.defaultProps={searchResults: []};

export default SearchResults;
