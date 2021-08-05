# DC Music
### <a href="https://dcmusic.netlify.app">Link to live website</a>
## Artist information at your fingertips


An application used to filter data from Deezer API, BandsinTown API, The Audio DB API, and display the information using HTML, JavaScript, and CSS.

## Developers
 - Hayden Gregory
    - <a href="https://www.linkedin.com/in/hayden-gregory-55b960a5?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BccJaD5ANR2uWfbiN00YZqg%3D%3D"> Linkedin </a>
    - <a href="https://github.com/HaydenGregory">Github</a>
 - Kevin Leon
    - <a href="https://github.com/kevinleon01">Github</a>
 - Karen Seunsom
    - <a href="https://www.linkedin.com/in/rasinie-seunsom/"> Linkedin </a>
    - <a href="https://github.com/karenseunsom">Github</a>
 - William Wilkerson
    - <a href="https://www.linkedin.com/in/willie-wilkerson-337675202/"> Linkedin </a>
    - <a href="https://github.com/williewilkerson27">Github</a>

## Project Status
Working for the first three months after launch. The student API key for BandsinTown will expire after that. All other functionality should remain the same.

## Project Screen Shot(s)

#### Home Page:   

![image](https://user-images.githubusercontent.com/84730187/125695272-b5cfa579-c581-4a0e-a377-fc86c2a1e3a1.png)
#### Results Page:

![image](https://user-images.githubusercontent.com/84730187/125696593-9a87a804-b7ed-478a-ac35-5906514094bd.png)

## Reflection

  - One week group project for Digital Crafts
  - Set out to build website that delivers useful artist information to the user.
  - This project was a learning experience for storage things in local storage to use on other pages, pulling large payloads from APIs, and large user interactivity.
  - Unexpected obstacles:
    - YouTube URLs delivered from the Audio DB API had a lot of variation and needed to be edited to embed on the the page. Used regular expression to grab the ID's at the end of all the varying links then created new links with the ID's.
    - Login functionality is easier to do in the back-end, and with this being a front-end project, it took some javascript ingenuity to create a similar functionality within local storage. 
    - Adding innerHTML from two different URLs onto the same spot on the page was harder than expected. A fetch inside a fetch was needed, along with a promise.all and "...".
  - What tools did you use to implement this project?
      - HTML and CSS were built using Bootstrap. This allowed for an easy to implement, clean look. Modifications to the elements were made to achieve a clear user-interface design. Javascript was used to get and present informatyion from various APIs, aklong with adding extra functionality to oother user-experience elements such as buttons.    

#### Background:  

This was a ~one week long porject built to cap off the front-end portion of DigitalCrafts' full-time Web Development course. Project goals included incorporating the use of two different APIs, saving user data, and creasting a functional and visually coherent site using the languages and skills we've learned up to this point.

Originally we wanted to build a site that pulled up information and concert dates of a music artist using the Spotify and BandsinTown APIs. When the use of those became increasingly complicated, we pivoted to different APIs that provided simialr data in a more managable manner, such as Deezer's. We started by building a simple HTML skeleton to provide the space for Javascript to display the musicians' information.

The main challenges were due to APIs either being difficult to work with / retrieve information from and being use-limited, which meant it would break before the project was completed. The solution to these issues, using similar but different APIS, was found realityvley quickly. Another issue was the login functionality. Though this is usually done in the back-end, with this being a front-end project, a faux-verification process was implemented using Javascript and locally storing files.  

One of the main challenges I ran into was Authentication. This lead me to spend a few days on a research spike into OAuth, Auth0, and two-factor authentication using Firebase or other third parties. Due to project time constraints, I had to table authentication and focus more on data visualization from parts of the API that weren't restricted to authenticated users.

In the end, the website was buitl using VanillaJS, Bootstrap, HTML, and CSS. The objective was clear from the beginning, build a site that you can seearch an artist on iand it will presnet relevant information on them such as songs and tour dates. And as more ideas sprung up throughout the time-window, they were implemented. 
