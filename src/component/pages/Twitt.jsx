// src/Tweet.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tweet = () => {
 

    return (
        <div className="tweet">
            <div className="user">
                <img src={user.profile_image_url_https} alt={user.name} style={{ width: '50px', borderRadius: '50%' }} />
                
            </div>
            <p>{tweet.core.user_results.result.legacy.description}</p>
            <p><strong>Source:</strong> {tweet.core.user_results.result.legacy.followers_count}</p>
            <p><strong>Views:</strong> {tweet.views.count}</p>
        </div>
    );
};

export default Tweet;
