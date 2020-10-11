'use strict';



function onInit(){
    renderProjs();
}
function renderProjs(){
    var projs = getProjs();
    var strHTMLs = '';

    projs.forEach(function(proj){
        strHTMLs += `
        <div class="col-md-4 col-sm-6 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href="#portfolioModal1">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="${proj.img}" alt="">
          </a>
          <div class="portfolio-caption">
            <h4>${proj.title}</h4>
            <p class="text-muted">Illustration</p>
          </div>
        </div>
        `
    });
    var displayContent = document.querySelector('.content-here');
    displayContent.innerHTML = strHTMLs;
}