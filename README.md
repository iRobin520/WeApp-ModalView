# WeApp-ModalView
微信小程序自定义模态弹窗，完全根据传入的数据值动态生成各种类型的组件

调用方法举例：

this.modalView.showModal({
   title: '申请退货',
   confirmation: true,
   confirmationText: '确定要申请退货吗？',
   inputFields: [{
     fieldName: 'reason',
     fieldType: 'Picker',
     fieldPlaceHolder: '选择退货原因',
     fieldDatasource: reasons,
     isRequired: true,
   },
   {
     fieldName: 'test',
     fieldType: 'Text',
     fieldPlaceHolder: '请填写测试信息',
     isRequired: false,
    },
    {
      fieldName: 'descriptions',
      fieldType: 'Textarea',
      fieldPlaceHolder: '请填写退货描述',
      isRequired: false,
    }],
    confirm: function (res) {
       console.log(res)
       //按确定以后的数据传回到这里
     }
 })
