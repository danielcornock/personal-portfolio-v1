---
title: Static site search using vanilla JS
description: >-
  A simple search feature that can be implemented on any static site without any external libraries.
author: Daniel Cornock
category: tutorials
featuredImg: /assets/img/post_static-search.jpg
imgCredits: Unsplash
tags:
  - Jekyll
  - Javascript
featured: true
---

In this tutorial, you will learn how to create a simple search for a static site using vanilla Javascript. It is ideal for use with blogs, recipe websites, and any website that holds searchable content on a small scale. If you want an example, have a go at using the search bar above and see it work for yourself!

Just before we begin, I'd like to mention that I am using Jekyll to automatically loop through the posts on my site. This is not necessary for the tutorial, but it saves you repeating yourself when creating the searchable items. For more information about what Jekyll does and how to set it up, take a look [here](https://jekyllrb.com/).

## Step 1 - Creating a page that holds all of your searchable items
Create a new page on your site - I callerd mine `archive`. This page will hold all of the searchable content. To make this easy, each of your searchable items should have the same structure, so that the Javascript you write can easily traverse through the information for each post and provide accurate search results.

To not make it too resource-heavy, we will be searching through the *tags*, *title* and *description* of each post. For the most part, you can leave it as you would when normally displaying posts. However, to make searching easier, we're going to add a `data-search` attribute to the container of each post that holds the tags. If using jekyll, you can use the following code below.

```html
{% raw %}<li class = "post" data-search = "{{ post.tags | join: ' ' }}>{% endraw %}
```

Otherwise, you can just add your tags manually with a space between each.

## Step 2 - Create the search function
The way this search function works is by looking at the URL, and checking if there is a value for the `hash` part of it using `window.location.hash`. You might have seen the has part of a URL before when adding navigation links that send you to a different part of the page using the ID of an element.

First, we can set up the function.

```javascript
const searchPosts = function() {
  if (!window.location.hash) {
    return;
  }
  const postList = document.querySelector('.blog-posts');
  const allPosts = Array.from(postList.querySelectorAll('.post'));
}();
```

- We automatically call the function by placing it in a variable and adding `();` after the curly braces.
- `if (!window.location.hash)` stops the function from running if there is no hash string found in the URL.
- We use `Array.from` on the `allPosts` variable because `querySelectorAll()` extracts a node list, and we will be needing an array in order to use the filter function on it.

After where the variables are assigned, we now need to declare and initialise a few more variables.

```javascript
let rawSearchCriteria = window.location.has.substr(1);
let searchCriteria = rawSearchCriteria.toUpperCase();
let searchCount = 0;
```

- The `rawSearchCriteria` extracts the has value from the url, and uses `substr(1)` to remove the first item from the string, which in our case is the `#` symbol.
- The `searchCriteria` converts that value into uppercase to be compared with the values found in the posts.
- `searchCount` will be used to keep track of how many items match the criteria of the search.

Now, we need to create a few functions outside of the main function that are reponsible for comparing each element that we want tested to the search criteria.

```javascript
const searchTagsMatch = (post, searchCriteria) => {
    tag = post.dataset.search.toUpperCase();
    return tag.includes(searchCriteria);
}
const searchTitleMatch = (post, searchCriteria) => {
    title = post.querySelector('.post-title').textContent.toUpperCase();
    return title.includes(searchCriteria);
}
const searchDescriptionMatch = (post, searchCriteria) => {
    title = post.querySelector('.post-description').textContent.toUpperCase();
    return title.includes(searchCriteria);
}
```

As I mentioned earlier, we put the tags into it's own dataset on the HTML element. This is because at this stage, we would have to select all of the tag elements and compare each of them to the search critera. However with this method we can just all the same `.includes()` method on them as we do with the title and description.

These functions are quite repetitive, so if you can think of a more efficient way, don't hesistate to send me a message or let me know in the comments!

Now that these functions have been taken care of, we can plug them into a filter function back in our main function.

```javascript
let filteredPosts = allPosts.filter(post => {
    if (searchTagsMatch(post, searchCriteria)) {
        searchCount++;
        return true;
    } else if (searchTitleMatch(post, searchCriteria)) {
        searchCount++;
        return true;
    } else if (searchDescriptionMatch(post, searchCriteria)) {
        searchCount++;
        return true;
    }
})
```

This function will run through each of the elements in the `allPosts` array, and plug them in to each of the functions that we defined just above. If any of these return true, that post will be added to `filteredPosts` and `searchCount` will be incremented.
