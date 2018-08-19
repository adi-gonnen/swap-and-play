<template>
  <div class="about flex column">
    <div class="header-desc">
      <p class="prolog">This application was designed and implemented as a final project of Coding Academy bootcamp.</p>
      <p class="prolog">We used Vue.js framework and combined pure css as well as other libraries.</p>
      <p class="prolog">In the backend side, we used Node.js and Mongo DB + Cloudinary to store the data.</p>
      <p class="prolog">Enjoy our site! Feel free to contact us. </p>
    </div>
    <h1 class="header">meet us</h1>
    <div class="team-container flex">
      <div class="member-container flex column">
        <div class="user-img" :style="{backgroundImage: tally, 
            backgroundSize: 'cover', backgroundPosition: 'center', backgroundrepeat: 'no-repeat'}">
        </div>  
        <h1>Tally Affek</h1>
        <h3 class="secondary-haeder">Full Stuck Developer</h3>
        <div class="icons-container flex">
          <a class="link" href="https://github.com/tallyaff" target="_blank"><i class="fab fa-github-square"></i></a> 
          <a class="link" href="https://www.linkedin.com/in/tally-affek-7b3a12140/" target="_blank"><i class="fab fa-linkedin"></i></a>
          <a class="link" id="tally-mail" @click="submitMail('tally')" action="mailto:tallyaff@gmail.com" method="post" enctype="text/plain"><font-awesome-icon icon="envelope"/></a> 
        </div>
        <p class="about-me">After five years of being a QA person, I've decided to become a programmer. At my free time I like to cook, travel and dive.</p>
        <p class="about-me">
          I hope you will enjoy my portfolio, and would like to hear from you in case you have any suggestions by my Linkdin account.</p>
        <div class="icons-container flex">
        </div>
      </div>
      <div class="member-container flex column">
        <div class="user-img" :style="{backgroundImage: liron, 
            backgroundSize: 'cover', backgroundPosition: 'center', backgroundrepeat: 'no-repeat'}">
        </div>  
        <h1>Liron Reshef Steinberger</h1>
        <h3 class="secondary-haeder">Full Stuck Developer</h3>
        <div class="icons-container flex">
          <a class="link" href="https://github.com/LironReshefSteinberger" target="_blank"><i class="fab fa-github-square"></i></a> 
          <a class="link" href="https://www.facebook.com/liron.reshef.1" target="_blank"><i class="fab fa-facebook"></i></a> 
          <a class="link" href="https://www.linkedin.com/in/liron-reshef-steinberger/" target="_blank"><i class="fab fa-linkedin"></i></a> 
          <a class="link" id="liron-mail" @click="submitMail('liron')" action="mailto:reshef.liron@gmail.com" method="post" enctype="text/plain"><font-awesome-icon icon="envelope"/></a> 
        </div>
          <p class="about-me">I'm a Coding Academy Bootcamp graduate.</p>
          <p class="about-me">
          I have experience with writing advanced single page applications using Vue.js &amp; Vuex framework.</p>
          <p class="about-me">
                    I earned my M.Sc in Materials and Nanotechnology from Tel Aviv University, and B.Sc. in Chemical Engineering from Shenkar College of Engineering and Design, Israel.</p>
          <p class="about-me">
          I studied graphic design to combine it with my hobbies: photography and painting.</p>
      </div>
      <div class="member-container flex column">
        <div class="user-img" :style="{backgroundImage: adi, 
            backgroundSize: 'cover', backgroundPosition: 'center', backgroundrepeat: 'no-repeat'}">
        </div>  
        <h1>Adi Gonnen</h1>
        <h3 class="secondary-haeder">Full Stuck Developer</h3>
        <div class="icons-container flex">
          <a class="link" href="https://github.com/adi-gonnen" target="_blank"><i class="fab fa-github-square"></i></a> 
          <a class="link" href="https://www.facebook.com/adi.shachamgonnen" target="_blank"><i class="fab fa-facebook"></i></a> 
          <a class="link" href="https://www.linkedin.com/in/adi-gonnen/" target="_blank"><i class="fab fa-linkedin"></i></a> 
          <a class="link" id="adi-mail" @click="submitMail('adi')" action="mailto:adigonnen@gmail.com" method="post" enctype="text/plain" ><font-awesome-icon icon="envelope"/></a> 
        </div>
        <p class="about-me">Lives in Ramat-Gan.</p>
          <p class="about-me">
          I have M.Sc. in Biochemistry from the Hebrew University and B.Sc in Biotechnology Engineering from Ben Gurion university.</p>
          <p class="about-me">
                    Worked for 10 years in Nestle Ice Cream as technical lead and project manager.</p>
          <p class="about-me">
          I still love ice cream! But,
          I’m starting my journey of transforming from a food engineering expert to a software development specialist, and enjoying every moment in the way!</p>

        
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "about",
    data() {
      return {
        liron: `url("img/user/liron.jpg")`,
        tally: `url("img/user/tally.jpg")`,
        adi: `url("img/user/adi.jpg")`,
      }
    },
    methods: {
      submitMail(name) {
        var mail;
        if (name === 'adi') mail = 'adigonnen@gmail.com';
        else if (name === 'tally') mail = 'tallyaff@gmail.com'
        else mail = 'reshef.liron@gmail.com'
        window.location = open(`https://mail.google.com/mail/?view=cm&fs=1&to=${mail}`,"_blank");
      }
    }
  }
</script>
<style scoped lang="scss">
    @import "~@/assets/scss/style.scss";

.user-img {
  width: 200px;
  height: 200px;
  align-self: center;
}
.team-container {
  justify-content: space-around;
   margin: 30px 0;
}

.header {
  color: $secondary-color;
  font-size: 35px;
}

.header-desc {
  margin: 50px auto 0 auto;
  width: 85%;
  overflow-wrap: break-word;
  // margin: auto;
  p {
    font-size: 1.5em;
  }
}

.about {
  margin: 30px auto;
  font-family: "Ubuntu";
  max-width: 980px;
  h1 {
    text-transform: capitalize;
    margin: 40px;
  }
}

.member-container {
 width: 33%;
 margin: 20px;
 p {
   font-size: 1.3em;
   padding: 8px;
   text-align: left;
 }
 h1 {
   font-size: 1.5em;
   color: $main-color;
   height: 60px;
 }
 h3 {
   padding: 15px;
 }
}

.prolog {
  font-family: 'Ubuntu-regular';
  color: grey;
  font-size: 20px;
  text-align: left;
  line-height: 1.5;
}

.icons-container {
  justify-content: space-around;
  margin-bottom: 15px;
  a {
    font-size: 1.5em;
    cursor: pointer;
  }
}
.no-cursor {
  cursor: none;
}

.secondary-haeder, .link {
  color: $secondary-color;
}

.about-me {
  font-family: 'Ubuntu-regular';
  color: grey;
  font-size: 18px;
  line-height: 1.2;
}

@media (max-width: 800px){
  .prolog {
    width: 95%;
  }
  .member-container {
     width: 95%;
     margin: 20px;
     h3 {
       line-height: 1em;
      //  width: 100%;
      padding: 10px 0;
     }
  }
}
@media (max-width: 670px){
  
  .team-container {
    flex-direction: column;
  }
  .member-container {
    width: 70%;
    width: 90%;
    //  margin: 25px auto;
     h1 {
       margin: 15px;
       height: 30px;
     }
     p {
       margin-bottom: 30px;
      //  width: 70%;
       padding: 5px;
     }
  }
  .header-desc {
    // width: 95%;
    margin: auto;
    p {
      text-align: left;
      font-size: 1em;
    }
  }
  .icons-container {
    justify-content: center;
    a {
      margin: 15px;
    }
  }
}
</style>
