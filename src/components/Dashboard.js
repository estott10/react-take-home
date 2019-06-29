import React, {Component} from 'react';
import axios from 'axios';
import {PullToRefresh} from "react-js-pull-to-refresh";
import {PullDownContent, ReleaseContent, RefreshContent} from "react-js-pull-to-refresh";
const copy = require('clipboard-copy');

export default class Dashboard extends Component{
  constructor(){
    super()

    this.state = {
        campaigns: [],
        value: '',
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount(){
    
       axios.get("https://www.plugco.in/public/take_home_sample_feed")
       .then(result => {   
       this.setState({
            campaigns: result.data.campaigns
          });
         })
     }

    render(){
        const {campaigns} = this.state;

    return(
        <div className="offers">
            <PullToRefresh
            pullDownContent={<PullDownContent />}
            releaseContent={<ReleaseContent />}
            refreshContent={<RefreshContent />}
            pullDownThreshold={100}
            onRefresh={this.onRefresh}
            triggerHeight={20}
            backgroundColor='white'
            startInvisible={true}
            >
            <div style={{height: '10px', textAlign: 'center'}}>
                <div>^</div>
            </div>
            <div className="offerGrid">
            {campaigns.map( (campaign, i) => {
            return <ul className="campaign" key= {i}> 
                <div style={{ display: 'flex', flexDirection: 'row'}}>
                    <div>
                        <img id="campaign-logo" alt="" src = {campaign.campaign_icon_url}></img>
                    </div>
                    <div className = "header" style={{ flexDirection: 'column'}}>
                        <h1 id="campaign-name">{campaign.campaign_name}</h1>
                        <h2 style={{color: '#009330'}}>{campaign.pay_per_install} per install</h2>
                    </div>
                </div>
                <div className="mediagrid" style={{ display: 'flex', flexDirection: 'row'}}>
                    {campaign.medias.map( (media, i) => {
                        return <ul id="media" key= {i}>
                                    <div className="cover">
                                        <img alt="" id={media.media_type} src = {media.cover_photo_url} className="thumbnail" style={{height: "100%", width: "100"}}></img>
                                    
                                        { media.media_type === "video" ? <div id="playbutton" className="playbutton"></div> : null }
                                    </div>
                                    <div id="media-access">
                                        
                                        <div id="link-icon">
                                            <div onClick={() => {copy(media.tracking_link)}} style={{paddingTop:"5px"}} id="link-icon"></div>
                                        </div>
                                        <div id="download-icon">
                                        {/* <a href= {media.download_url} download><div></div></a> */}
                                        <a href={media.download_url} download>
                                            <button></button>
                                            <i className="icon-download4"></i>
                                        </a>
                                        </div>
                                    </div>
                                </ul>
                     })
                    }
                </div>
              </ul>
            })
        }
          </div>
          </PullToRefresh>
        </div>
    )
}
}
