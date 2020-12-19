const paralaxis = {
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

                        let pageTop = this.elmPos(albumPage).top;
                        let theImage = albumPage.querySelector('.paralaxis-image img');
                        let theImageHeight = theImage.style.height;
                        if(pageTop<=21){
                            if(theImage.classList.contains("released")){
                                theImage.classList.replace("released","fixed");
                            }else{
                                theImage.classList.add("fixed");
                            }
                        }else if(pageTop>21 && theImage.classList.contains("fixed")){
                            console.log('yeterince uzaklasti')
                            theImage.classList.replace("fixed","released");
                        }
                        //simdi son yazi bottom sifir olunca fixed release edilecek
                        let pageCaptions = albumPage.querySelectorAll('.paralaxis-caption');
                        let pagesLastCaption = pageCaptions[pageCaptions.length-1];
                       console.log(`Son aciklama divinin bottom degeri: ${this.elmPos(pagesLastCaption).bottom}`);
                        if(this.elmPos(pagesLastCaption).bottom<0){
                           console.log('Yes be annem')
                            theImage.classList.replace("fixed","released");
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
