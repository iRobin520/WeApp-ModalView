# WeApp-ModalView
微信小程序自定义模态弹窗，完全根据传入的数据值动态生成各种类型的组件， 无需修改任何模版或样式的的代码，只需添加相应的js字段即可。

先上效果图：
![image](https://github.com/iRobin520/WeApp-ModalView/raw/master/effect.png)

示列代码：<br>
在wxml文件中加入代码：<br>
< import src="../../../../components/modal-view/modal-view.wxml" / ><br>
< template is="modalView" data="{{ ...__modalView__ }}" / > <br>

在js文件中加入代码：<br>
import { ModalView } from '../../../../components/modal-view/modal-view'

在onLoad事件中加入：
new ModalView

在你自己定义的事件中加入：<br>
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
　　{<br>
　　　fieldName: 'test',<br>
　　　fieldType: 'Text',<br>
　　　fieldPlaceHolder: '请填写测试信息',<br>
　　　isRequired: false,<br>
　　},<br>
　　{<br>
　　　fieldName: 'descriptions',<br>
　　　fieldType: 'Textarea',<br>
　　　fieldPlaceHolder: '请填写退货描述',<br>
　　　isRequired: false,<br>
　　}],<br>
　　confirm: function (res) {<br>
　　　console.log(res)<br>
　　　//用户按确定按钮以后会回到这里，并且对输入的表单数据会带回<br>
　　}<br>
})<br>
