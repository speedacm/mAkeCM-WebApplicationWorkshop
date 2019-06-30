# Adding a Project Rating feature to your portfolio

This document is a summary of what was accomplished at the Web Application Workshop for mAkeCM Day 2019.  It gives a step by step guide of how to build a Project Rating feature for the portfolio template.

The goal is to display the following information for each project:

- Title
- Description
- Average Rating
- Individual Ratings with Comments

Additionally, we would like users to be able to add their own rating for the project, and optionally leave a comment along with it.


## Intro to Markup
[/src/app/projects/projects.component.html](/src/app/projects.component.html)

Markup defines the structure and content of a web application.  The most common markup language is HTML.  HTML is a great tool, but many front-end application frameworks extend it and add their own syntax.  In this project, we are using a popular front-end framework made by Google known as Angular.  Angular, like its peers, aims to reduce the amount of code needed to develop rich client-side applications.  Angular accomplishes this by providing tools to run a single-page application with quick and easy data-bindings between markup and logic.

Let's work on the markup for the "Projects" page; or in Angular terminology: Component.  First, change the contents of the `<h1>` element:

```html
<h1>My Project Ideas</h1>
```

Currently, the title of each project is displayed in a `<p>` tag.  We want to change this and give each project a little bit more form. Let's wrap the title in a `<h2>` tag instead.  We can put the description of the project in a `<p>` tag below it.

```html
<div *ngFor="let project of projects">
    <h2>{{project.title}}</h2>
    <p>{{project.description}}</p>
</div>
```

There, now we can see a description of each project along with the title.  Next we'll add the average rating for the project.  Let's add another `<p>` element and get the average rating of the project to display within it.  We'll add a Pipe to format this number nicely.  Pipes are another Angular concept we won't delve too into deeply.

```html
<div *ngFor="let project of projects">
    <h2>{{project.title}}</h2>
    <p>{{project.description}}</p>
    <p>{{(getAverageRating(project) | number:'1.1-1') || 'N/A'}}</p>   
</div>
```

If you look at your page now, you'll quickly realize that something is wrong.  Let's figure out what.  Open the developer tools in your web browser by pressing `F12`.  You may have used these before to joke around in middle school, but they are a powerful tool you'll rely on all the time as a web developer.  Click on the console tab and you'll see the following message:

```
ERROR TypeError: "_co.getAverageRating is not a function"
```

This tells us that there is no `getAverageRating` function, which is what we were trying to use to display the average rating in the markup above.  This means we are going to have to define the function.

## Intro to Scripting

[/src/app/projects/projects.component.ts](/src/app/projects/projects.component.ts)

Scripting is what powers our web applications.  It enables us to make our content interactive and dynamic.  There is only one scripting language that modern web browsers understand: JavaScript.  Recently, WebAssembly has allowed more languages to be brought to the web, but it isn't a replacement for JavaScript.  While JavaScript is a very versatile language, the developers of Angular decided that Microsoft's language TypeScript is better suited for the framework.  TypeScript is a superset of JavaScript and transpiles to JavaScript so it can be understood by web browsers.  TypeScript adds features to JavaScript. Foremost of which is a modern, composable type system.

As explained before, we need to add a `getAverageRating` function to our "Projects" component.  Let's start by adding the function definition.  At the bottom of the `ProjectsComponent` class, add the following:

```TypeScript
getAverageRating(project: Project): number {

}
```

In brief summary, this defines a function on the `ProjectsComponent` class called `getAverageRating`.  In the parenthesis we define the function parameters; in this case a project.  We specify a name with which we may reference the parameter and after a colon we specify the type of this parameter.  After the parenthesis we add a colon followed by the type which this function will return: `number`.  This function doesn't do anything yet though; we need to calculate the average rating and return it.  Add the following inside your new function:

```TypeScript
getAverageRating(project: Project): number {
    let total = 0, count = 0;
    for (let rating of project.ratings)
    {
        count++;
        total += rating.value;
    }
    return count > 0 ? total / count : undefined;
}
```

The logic here is pretty simple.  We declare two variables: `total` and `count`.  For every rating of the project, we increment count and add the value to the total.  Finally, if `count` is greater than zero, we return the average.  If `count` is still zero, then we return `undefined` to signal that the average can't be computed.

Save your files and view your portfolio in your web browser.  Now you should see the average rating for each project displayed beneath the description!

## Intro to Stylesheets

[/src/app/projects/projects.component.scss](/src/app/projects/projects.component.scss)

Stylesheets are the third and final key to a good web application.  Stylesheets tell web browsers how the content of a page should appear.  It allows us to organize information in dynamic and intuitive layouts, add colors, animations, and much much more!  CSS is the language browsers use to apply styles to the content.  We are using using a language called SCSS (or Sass) to write our styles.  SCSS is a superset of CSS which allows us to write less and express our styles in a more readable way.

Our web application is starting to come together, but we really should style our projects page to make it more appealing.  However before we can start applying styles, we need a way to *select* the content which we want to style.  The best way to do this is to add classes to elements in our markup.  Lets do that now, modify [/src/app/projects/projects.component.html](/src/app/projects/projects.component.html) so it looks like the following:

```html
<div class="project" *ngFor="let project of projects">
    <h2 class="title">{{project.title}}</h2>
    <p class="description">{{project.description}}</p>
    <p class="avg-rating">{{(getAverageRating(project) | number:'1.1-1') || 'N/A'}}</p>
</div>
```

We've added a class to each of the four elements of our project.  These classes will allow us to select these elements and apply the styles we want to each of them.  I won't delve too deeply into the intricacies of SCSS—an entire course could be taught on CSS alone—but for the most part it is self-explanatory.  Let's start by styling the `<div>` element for each project.

```scss
.project {
    position: relative;
    background: #f4f4ff;
    padding: 0.5em 2em;
    margin: 1em 0;
    border-radius: 0.5em;
}
```

The `.project` selector selects any element with `class="project"` and applies the styles inside the braces.  This snippet adds a background color and creates a nice space for all the children of the element to live.  I like the title and description, but I think this would look better if the rating was displayed at the top-right corner and was a little bigger.  To do that, we will add the `.avg-rating` selector inside the `.project` style.  This will select any element with `class="avg-rating"` that is a child of an element with `class="project"`.

```scss
.project {
    position: relative;
    background: #f4f4ff;
    padding: 0.5em 2em;
    margin: 1em 0;
    border-radius: 0.5em;

    .avg-rating {
        position: absolute;
        right: 1em;
        top: 1em;
        margin: 0;
        font-size: 1.5em;

        &::after {
            content: ' \2764\FE0F';
        }
    }
}
```

This positions our rating in the top-right, makes it slightly bigger, and adds a nice heart icon to the right of it.  Everything is looking good so far and we have a happy web page, but there is still much more to do.

## Displaying Comments

Next step is to display comments on our projects for all the ratings that have comments.  Let's start with the markup.  We are going to leverage more power provided to use by Angular to do this.  Modify [/src/app/projects/projects.component.html](/src/app/projects/projects.component.html) so it includes the following:

```html
<div class="project" *ngFor="let project of projects">
    ...

    <div *ngFor="let rating of project.ratings">
        <div class="rating" *ngIf="rating.comment">
            <div class="hearts">
                <span *ngFor="let i of [1,2,3,4,5]">
                    <span [ngClass]="rating.value >= i ? 'red-heart' : 'black-heart'"></span>
                </span>
            </div>
            <p class="comment">{{rating.comment}}</p>
        </div>
    </div>
</div>
```

This is a lot at once, so let's break it down.  First, we want to add an element for every rating the project has.  If that rating has a comment, we want to display info about it.  Thus we have these elements:

```html
<div *ngFor="let rating of project.ratings">
    <div class="rating" *ngIf="rating.comment">
        ...
        <p class="comment">{{rating.comment}}</p>
    </div>
</div>
```

This is pretty easy to follow.  Let's take a look at the other bit now.

```html
<div class="hearts">
    <span *ngFor="let i of [1,2,3,4,5]">
        <span [ngClass]="rating.value >= i ? 'red-heart' : 'black-heart'"></span>
    </span>
</div>
```

This will contain hearts representing the rating the commenter gave the project.  We will display five hearts for the numbers one through five.  If the rating is greater than or equal to the number, we will display a red heart.  If the rating is less than the number, we will display a black heart.  Before we can see this though, we need to make some changes to our stylesheet.  Modify [/src/app/projects/projects.component.scss](/src/app/projects/projects.component.scss) by adding the following in the `.project` selector:

```scss
.project {
    ...

    .rating {
        border-top: 1px solid #444;
        padding: 0 1em;

        .hearts {
            float: right;
            margin-top: 0.5em;
            
            .red-heart::after {
                content: '\2764\FE0F';
            }

            .black-heart::after {
                content: '\1F5A4';
            }
        }
    }
}
```

We're coming along nicely, but we can't have a web application unless we have some interactivity.  In the next section we'll add the ability to add a new rating and optional comment to each project.

## Adding Ratings

In order to add new ratings, we are going to have to add some new logic.  This means we're editing [/src/app/projects/projects.component.ts](/src/app/projects/projects.component.ts) by adding one new function—`submitRating`—and a new property—`userRatings`.  Let's begin with the property, since it's fairly simple to add.  At the very top of the `ProjectsComponent` class, add the following line of code:

```TypeScript
userRatings: { [projectId: number]: Rating } = {};
```

This looks pretty confusing at first, but it's easy to explain.  `userRatings` is a property and `{ [projectId: number]: Rating }` is its type.  This is a complex type that defines a key-value collection.  `[projectId: number]` defines the key, which is of type number.  The value will be of type `Rating`.  Therefore, we have a collection of Ratings keyed by a project ID.  This will allow us to keep track of the user's rating for every project.

Next, let's add our function at this bottom of `ProjectsComponent`:

```TypeScript
submitRating(projectId: number): void {
    if (this.userRatings[projectId].value)
    {
        if (!this.userRatings[projectId].comment)
        {
            this.userRatings[projectId].comment = null;
        }

        this.data.addRating(projectId, this.userRatings[projectId]).subscribe(
            () => {
                this.userRatings[projectId] = undefined;
                this.updateProjects();
            }
        );
    }
}
```

This function that calls the `addRating` function from the provided `DataService`.  If the user selected a rating, we pass the project ID and the associated rating in as parameters.  If the comment was left blank, we make sure it's set to `null` before sending.  If the request is successful, we update our list of projects by calling `updateProjects` and reset the user's rating.

To use this new feature we need to add some content to our markup.  Edit [/src/app/projects/projects.component.html](/src/app/projects/projects.component.html) and add the following:

```html
<div class="project" *ngFor="let project of projects">
    ...

    <div class="new-rating">
        <button *ngIf="!userRatings[project.projectId]" 
            (click)="userRatings[project.projectId] = { comment: '', rating: 0 }">
            Add Rating
        </button>
        <div class="user-rating" *ngIf="userRatings[project.projectId]">
            <textarea [(ngModel)]="userRatings[project.projectId].comment"></textarea>
            <div class="hearts">
                <span *ngFor="let i of [1,2,3,4,5]">
                    <span [ngClass]="userRatings[project.projectId].value >= i ? 'red-heart' : 'black-heart'"
                        (click)="userRatings[project.projectId].value = i"></span>
                </span>
            </div>
            <button (click)="submitRating(project.projectId)">Submit Rating</button>
        </div>
    </div>
</div>
```

This is a bit complex, but overall is very similar to the markup for displaying comments.  The biggest difference is the addition of `(click)` and `[(ngModel)]` directives provided by Angular.  `(click)` allows us to perform an action when an element is clicked by the user.  `[(ngModel)]` binds the user's input to a variable.

To finish up, all we need to do is add some style.  Open [/src/app/projects/projects.component.scss](/src/app/projects/projects.component.scss) and add the following:

```scss
.project {
    ...

    .new-rating {

        button {
            background: #894aff;
            padding: 0.5em;
            border: none;
            border-radius: 0.25em;
            color: #fff;
            font-size: 1.25em;
            cursor: pointer;

            &:hover {
                background-color: #692acc;
            }
        }

        .user-rating {
            display: flex;

            textarea {
                flex-grow: 1;
                margin: 0.5em;
                resize: vertical;
                min-height: 3em;

                font-family: sans-serif;
            }
            
            button {
                margin: 0.5em;
                height: 2.5em;
            }

            .hearts {
                font-size: 1.5rem;
                margin: 0.5em;
                cursor: pointer;
                
                .red-heart::after {
                    content: '\2764\FE0F';
                }                
            
                .black-heart::after {
                    content: '\1F5A4';
                }

                .red-heart:hover::after,
                .black-heart:hover::after {
                    content: '\1F499';
                }
            }
        }
    }
}
```

That's a whole lot at once.  All you really need to know though, is that this makes everything easier on the eye.

## Conclusion

Your new portfolio is now complete with a wicked project idea rating feature!  Test it out.  You should be able to add your own ratings to different project ideas.  If you leave a comment, it should show up in the list of comments below the project.

Hopefully this was a fun introduction to web application development that made everything seem a little less daunting.  Web applications can be massive projects.  It's impossible to learn everything in an hour, but hopefully you leave with an idea of what it is all about and feel inspired to learn more.  If you have any questions about the topic or Speed ACM, feel free to email me: [luke.samuel@louisville.edu](mailto:luke.samuel@louisville.edu?subject=Web%20App%20Workshop)
