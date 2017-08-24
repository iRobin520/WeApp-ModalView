# WeApp-ModalView
微信小程序自定义模态弹窗，完全根据传入的数据值动态生成各种类型的组件

先上效果图：
![image](https://github.com/iRobin520/WeApp-ModalView/raw/master/effect.png)

示列代码：

this.modalView.showModal({<br>
   title: '申请退货',<br>
   confirmation: true,<br>
   confirmationText: '确定要申请退货吗？',<br>
   inputFields: [{<br>
     fieldName: 'reason',<br>
     fieldType: 'Picker',<br>
     fieldPlaceHolder: '选择退货原因',<br>
     fieldDatasource: reasons,<br>
     isRequired: true,<br>
   },<br>
   {
     fieldName: 'test',<br>
     fieldType: 'Text',<br>
     fieldPlaceHolder: '请填写测试信息',<br>
     isRequired: false,<br>
    },
    {
      fieldName: 'descriptions',<br>
      fieldType: 'Textarea',<br>
      fieldPlaceHolder: '请填写退货描述',<br>
      isRequired: false,<br>
    }],<br>
    confirm: function (res) {<br>
       console.log(res)<br>
       //按确定以后的数据传回到这里<br>
     }<br>
 })<br>
