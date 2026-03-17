# Newsletter Form Integration Guide

Since our blog is a **static site** hosted on GitHub Pages, we don't have a backend database to store email addresses. 

To make the newsletter form work, we need to connect it to a free form endpoint service.

## The Solution: Formspree.io (Takes 2 minutes)

1. Go to [Formspree.io](https://formspree.io/) and create a free account.
2. Click "New Form" and name it "AI Blog Newsletter".
3. Formspree will give you an Endpoint URL that looks like this: `https://formspree.io/f/your_unique_id`
4. Send me that URL here in the chat.

Once you give me that URL, I will update the code in our `pages/posts/[slug].js` file from this:
`<form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>`

To this:
`<form className="newsletter-form" action="YOUR_FORMSPREE_URL" method="POST">`

From then on, whenever someone enters their email and clicks "Subscribe", Formspree will capture it, save it to a list, and email you a notification.
