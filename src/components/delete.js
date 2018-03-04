import React, {Component} from 'react';
import $ from 'jquery';
import '../css/reset.css';
import '../css/chose.css';
class Delete extends Component {
    // constructor(props) {
    //     super(props);
    // }

    closeChose() {
        $('.delete-wrap').hide();
        $('.home-mask').hide();
        $('.chose-wrap').hide();
    }

    confirmDel() {
        const that = this;
        let remarkId = that.props.remark;
        let recordId = that.props.record;
        let speechId = that.props.speech;
        let removeType = that.props.removeType;

        let id = null;
        let url = '';
        if (removeType === 'remark') {
            id = remarkId;
            url = 'remark/delete';
        } else if (removeType === 'speech') {
            id = speechId;
            url = 'record/delete';
        } else if (removeType === 'record') {
            id = recordId;
            url = 'record/delete';
        }
        $.ajax({
            url: `http://${ window.localStorage['url'] }/api/` + url,
            method: 'POST',
            dataType: 'JSON',
            data: {
                id
            },
            success(res) {
                if (res.code === 200) {
                    console.log("成功")
                } else {
                    console.log("删除失败")
                }
            },
            error(res) {
                console.log("error")
            },
        })
        that.closeChose()
    }

    render() {
        return (
            <div className="delete-wrap">
                <div className="remark-header">
                    <div className="remark-close" onClick={this.closeChose.bind(this)}>
                        <img src={require("../images/close.png")} alt=""/>
                    </div>
                </div>
                <p className="delete-diss">您确认删除吗？</p>
                <div className="chose-btn">
                    <span onClick={this.confirmDel.bind(this)}>确认</span>
                    <span onClick={this.closeChose.bind(this)}>取消</span>
                </div>
            </div>
        )
    }
}
export default Delete;