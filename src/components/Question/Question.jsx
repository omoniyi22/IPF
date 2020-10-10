import React from 'react'
const Question = () => (
  <div className="real_question border-bottom">
    <div className="my_que   pnt p-2 z-balm">
      <div className="head  flex">
        <div className=" flex-2 break_2 hir pr-2">
          This is a question Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci architecto quisquam aut similique consequatur. Magni ut fuga illum sequi beatae laboriosam. Ut perspiciatis voluptate repudiandae ullam tempora debitis quo officiis.
              </div>
        <div className="set_up heart">
          <div className="fa fa-star border rounded-pill font-weight-light"></div>
          <div className="fa fa-lightbulb mx-1 border rounded-pill font-weight-light"></div>
          <div className="fa fa-check-double mr-1  border rounded-pill "></div>
        </div>
      </div>
      <div className="flex">
        <div className=" bottom heart flex-2">
          <div className="the_img border rounded-pill"
            style={{ backgroundImage: `url(${require('./../../assets/medias/user.png')})` }}
          />
          <div className="content py-1" >
            <div className="name">Andrew John</div>
            <div className="time break_1">{Date().toString().slice(0, 25)}</div>
          </div>
        </div>
        <div className="commentary heart">
          <div className="comments ld">12 comments</div>
          <div className="likes dl border ml-2">1 <span className="fa fa-comment pl-1 font-weight-light" /></div>
          <div className="likes border ml-2">1 <span className="fa fa-thumbs-up pl-1 font-weight-light" /></div>
          <div className="menus flex">
            <span className="rounded-pill  w-fit h-fit " />
            <span className="rounded-pill  w-fit h-fit " />
            <span className="rounded-pill  w-fit h-fit " />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Question