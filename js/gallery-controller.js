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
            <div class="portfolio-hover" onclick="onRenderModal('${proj.id}')">
              <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid img-render" src="${proj.img}" alt="">
          </a>
          <div class="portfolio-caption">
            <h4>${proj.title}</h4>
            <p class="text-muted">${proj.desc}</p>
          </div>
        </div>
        `
    });
    var displayContent = document.querySelector('.content-here');
    displayContent.innerHTML = strHTMLs;
}



function onRenderModal(id){
    var proj = getProjById(id);
    var modal = document.querySelector('.modal-render');
    modal.innerHTML = `
    <div class="portfolio-modal modal fade" id="portfolioModal1" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <!-- Project Details Go Here -->
                <h2>${proj.title}</h2>
                <p class="item-intro text-muted">${proj.labels}</p>
                <img class="img-fluid d-block mx-auto" src="${proj.img}" alt="">
                <button onclick="onOpenProj('${proj.id}')" class="check-it">CHECK IT OUT <i class="fas fa-arrow-right"></i></button>
                <p>${proj.desc}</p>
                <ul class="list-inline">
                  <li>Date: January 2017</li>
                  <li>Client: Threads</li>
                  <li>Category: Illustration</li>
                </ul>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                  <i class="fa fa-times"></i> Close Project</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `
}


function onOpenProj(id){
    var proj = getProjById(id);
    var projUrl = proj.url;
    window.open(projUrl);
}