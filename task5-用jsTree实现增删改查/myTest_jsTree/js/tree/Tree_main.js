/**
 * Created by zjf on 2016/11/18.
 */

$(function () {
    var to = false;
    $('#search').keyup(function () {
        if(to) { clearTimeout(to); }
        to = setTimeout(function () {
            var v = $('#search').val();
            $('#jstree').jstree(true).search(v);
        }, 250);
    });
    // 6 create an instance when the DOM is ready
 $('#jstree').jstree({
        "core" : {
            "animation": 0,
            "check_callback": true,
            "themes": {"stripes": true, "dots": true},
            'data': {
                'url': 'data/package.json',
                "dataType" : "json"
            }
        },
        "types" : {
            "#" : { "max_children" : 5,
                "max_depth" : 3 ,
            },
            "default" : {
                "icon" : "img/class-icon.png",
                "valid_children" : ["default","text"]
            },
            "text" : {
                "icon" : "img/profile-icon_3.png",
                "valid_children" : []
            }
     },
        "plugins" : [
            "dnd", "search",
            "state", "types", "wholerow","themes", 'json_data','unique'
        ]
    });
    // 7 bind to events triggered on the tree
    // $('#jstree').on("changed.jstree", function (e, data) {
    //     console.log(data);
    // });
    $('#jstree').on("select_node.jstree", function (e, data) {
        if(data.node.parent=="#"||data.node.parent=="node0"){
            $('.edit').attr("disabled","true");
        }else{
            $('.edit').attr("disabled",false);
        }
        console.log(data);
        if(data.node.parent!="node0"&&data.node.parent!="#") {
            var parent=$('#jstree').jstree(true).get_node(data.node.parent);
            $("#class").text(parent.text);
            $("#name").text(data.node.text);
            $("#id").text(data.node.data[0]);
            $("#major").text(data.node.data[1]);
        }
        else{
            $("#class").text("");
            $("#name").text("");
            $("#id").text("");
            $("#major").text("");
        }
    });
});


function show(){
    var ref = $('#jstree').jstree(true),
        sel = ref.get_selected(),
        selnode=ref.get_selected(true);
    console.log(selnode[0].parents);
    if(selnode[0].parent=="node0"){
        $(".add").attr({"data-toggle":"modal","data-target":"#myModal"});
    }else{
        sel = sel[0];
        sel = ref.create_node(sel, {"type": "default"});
        ref.edit(sel);
    }

}

function node_create() {
    var name=$('.name').val();
    var id=$('.id').val();
    var major=$('.major').val();
    var ref = $('#jstree').jstree(true),
        sel = ref.get_selected(),
        selnode=ref.get_selected(true);
        console.log(name);
    if(!sel.length) { return false; }
        sel = sel[0];
        sel = ref.create_node(sel, {"type":"text","text":name,"data":[id,major]});
        ref.deselect_all();
        ref.select_node(sel);
        $(".add").attr({"data-toggle":"","data-target":""});
};
function node_rename() {
    var ref = $('#jstree').jstree(true),
        sel = ref.get_selected(),
        selnode=ref.get_selected(true);
    if(!sel.length) { return false; }
    sel = sel[0];
    if(selnode[0].parent!="node0") {
        alert("只能修改班级名！");
        return false;
    }else{
        ref.edit(sel);
    }
};
function node_delete() {
    var ref = $('#jstree').jstree(true),
        sel = ref.get_selected(),
        selnode=ref.get_selected(true);
    if(!sel.length) { return false; }
    if(selnode[0].parent=="#") {
        alert("不能删除根目录！");
        return false;
    }else{
        if(confirm("你确定要删除吗？"))
        ref.delete_node(sel);
    }
};

function new_node_delete(){
    var ref = $('#jstree').jstree(true),
        sel = ref.get_selected(),
        selnode=ref.get_selected(true);
        console.log(selnode[0].children[selnode[0].children.length-1]);
        sel=selnode[0].children[selnode[0].children.length-1];
        ref.delete_node(sel);
}

function edit_front(){
    var ref = $('#jstree').jstree(true),
        sel = ref.get_selected(),
        selnode=ref.get_selected(true);
    $('.name1').val(selnode[0].text);
    $('.id1').val(selnode[0].data[0]);
    $('.major1').val(selnode[0].data[1]);
    $(".edit").attr({"data-toggle":"modal","data-target":"#myModal2"});

}

function edit(){
    var name1=$('.name1').val();
    var id1=$('.id1').val();
    var major1=$('.major1').val();
    var ref = $('#jstree').jstree(true),
        sel = ref.get_selected(),
        selnode=ref.get_selected(true);
    console.log(name1+" "+id1+" "+major1);
    console.log(sel);
    console.log(selnode[0]);
    selnode[0].text=name1;
    selnode[0].data[0]=id1;
    selnode[0].data[1]=major1;
    ref.close_node(selnode[0].parent);
    ref.open_node(selnode[0].parent);
    ref.deselect_all();
    ref.select_node(sel);
    console.log(selnode);
    $(".add").attr({"data-toggle":"","data-target":""});
}



