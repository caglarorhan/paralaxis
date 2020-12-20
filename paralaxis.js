const paralaxis = {
    allowedTopApproachLimit: 21,
    docTop(){
        return document.documentElement.scrollTop
    },
    elmPos(elm){
            return elm ? elm.getBoundingClientRect():{
                top:NaN,
                bottom:NaN,
                errMsg:"Could not retrieve element id or element."
            };

    },
    reCalc(){
        let albums = document.querySelectorAll('.paralaxis-album');
                albums.forEach(album=>{

                    let albumPages = album.querySelectorAll('.paralaxis-page');
                    albumPages.forEach((albumPage)=>{
                        let albumPageBottomPadding = albumPage.style.paddingBottom;
                        let pageTop = this.elmPos(albumPage).top;
                        let theImage = albumPage.querySelector('.paralaxis-image img');
                        let theImageHeight = theImage.style.height;

                            albumPage.style.paddingBottom= '900px';

                        if(pageTop<=this.allowedTopApproachLimit){
                            console.log('Birinci durum')
                            if(theImage.classList.contains("released")){
                                theImage.classList.replace("released","fixed");
                            }else{
                                theImage.classList.add("fixed");
                            }
                        }
                        if(pageTop>this.allowedTopApproachLimit && theImage.classList.contains("fixed")){
                            theImage.classList.replace("fixed","released");
                            albumPage.style.paddingBottom= '10px';

                        }
                        //simdi son yazi bottom sifir olunca fixed release edilecek
                        let pageCaptions = albumPage.querySelectorAll('.paralaxis-caption');
                        let pagesLastCaption = pageCaptions[pageCaptions.length-1];
                        if(this.elmPos(pagesLastCaption).bottom<0){
                            theImage.classList.replace("fixed","released");
                            albumPage.style.paddingBottom= '30px';
                        }
                    });
                })
    },
    init(){

        window.addEventListener('scroll',()=>{
        this.reCalc()
        })
    }

}
