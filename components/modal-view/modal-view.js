/**
 * ModalView by Robin Shen
 * WeApp ModalView add-ons
 * 微信小程序 ModalView 增强插件
 * Created at 2017-08-23
 * Github: https://github.com/iRobin520/WeApp-ModalView.git
 * LICENSE: MIT
 */

function ModalViewClass() {
  //数据
  let _componentData = {
    '__modalView__.title': null,
    '__modalView__.inputFields': null,
    '__modalView__.confirm': null,
    '__modalView__.formData': null,
    '__modalView__.confirmation': false,
    '__modalView__.confirmationText': null,
  }
  //事件
  let _componentEvent = {
    //文本输入
    __modalView__onTextBlur: function (e) {
      var filedIndex = e.currentTarget.dataset.field_index
      var formData = this.data.__modalView__.formData
      formData[filedIndex] = e.detail.value
      this.setData({
        '__modalView__.formData': formData,
      })
    },
    //单选列表数据变更
    __modalView__onPickerChange: function (e) {
      var filedIndex = e.currentTarget.dataset.field_index
      let inputField = this.data.__modalView__.inputFields[filedIndex]
      var datasource = inputField.fieldDatasource
      var selectedIndex = parseInt(e.detail.value)
      var selectedPickerValue = datasource[selectedIndex]
      var formData = this.data.__modalView__.formData
      formData[filedIndex] = selectedPickerValue
      this.setData({'__modalView__.formData': formData})
    },
    //确定
    __modalView__onConfirm: function (e) {
      let page = this
      var formData = this.data.__modalView__.formData
      var errorMessage = null
      console.log(this.data.__modalView__.inputFields)
      for (var i = 0; i < this.data.__modalView__.inputFields.length; i++) {
        var field = this.data.__modalView__.inputFields[i]
        var value = formData[i]
        if (field.isRequired && !value) {
          errorMessage = field.fieldPlaceHolder
          break
        }
      }
      if (errorMessage) {
        page.setData({
          '__modalView__.reveal': false
        }) 
        wx.showModal({
          title: '',
          content: errorMessage,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              page.setData({
                '__modalView__.reveal': true
              })
            } 
          }
        })
        return
      }
      if (this.data.__modalView__.confirmation) {
        page.setData({
          '__modalView__.reveal': false
        }) 
        wx.showModal({
          title: '',
          content: this.data.__modalView__.confirmationText,
          success: function (res) {
            if (res.confirm) {
              page.__modalView__onHideModal()
              typeof page.data.__modalView__.confirm === 'function' && page.data.__modalView__.confirm(formData)
            } else {
              page.setData({
                '__modalView__.reveal': true
              }) 
            }
          }
        })
      } else {
        page.__modalView__onHideModal()
        typeof page.data.__modalView__.confirm === 'function' && page.data.__modalView__.confirm(formData)
      }
    },
    //取消
    __modalView__onCancel: function (e) {
      this.__modalView__onHideModal()
    },
    //弹出框蒙层截断touchmove事件
    __modalView__onPreventTouchMove: function (e) {

    },
    //隐藏
    __modalView__onHideModal: function () {
      let page = this
      let animation = wx.createAnimation()
      animation.opacity(0).step()
      page.setData({
        '__modalView__.reveal': false
      })     
    }
  }
  //构造函数
  function ModalView() {
    let pages = getCurrentPages()
    let curPage = pages[pages.length - 1]
    this.__page = curPage
    // 把组件的事件“合并到”页面对象上
    Object.assign(curPage, _componentEvent)
    curPage.setData(_componentData)
    curPage.modalView = this
    return this
  }
  //显示
  ModalView.prototype.showModal = function (data) {
    let page = this.__page
    let animation = wx.createAnimation()
    animation.opacity(1).step()
    if (data) {
      page.setData({
        '__modalView__.title': data.title,
        '__modalView__.inputFields': data.inputFields,
        '__modalView__.confirm': data.confirm,
        '__modalView__.formData': new Array(data.inputFields.length),
        '__modalView__.confirmation': data.confirmation ? data.confirmation: false,
        '__modalView__.confirmationText': data.confirmationText ? data.confirmationText : null,
      })
    }
    page.setData({
      '__modalView__.reveal': true
    })
  }
  return new ModalView()
}

module.exports = {
  ModalView: ModalViewClass
}