function TableSet(columnLabels,rowsData){
	//列名
	this.columnLabels = columnLabels;
	//行数据
	this.rowsData = rowsData;
}
//获取行数
TableSet.prototype.getRowCount = function(){
	return this.rowsData.length;
}
//获取列数
TableSet.prototype.getColumnCount = function(){
	return this.columnLabels.length;
}
//获取某一行
TableSet.prototype.getRow = function(index){
	var rowData = {},
		that = this;
	rowData = this.rowsData[index];	
	//将行数据转换成数组
	rowData.format = function(){
		var rowObj = {};
		for(var i=0,len = that.columnLabels.length;i<len;i++){
			//名称
			var name = that.columnLabels[i].name;
			rowObj[name] = rowData[i];
		}
		return rowObj;
	}
	return rowData;
}
//获取某行某列的值
TableSet.prototype.getCell = function(x,y){
	//获取第几行
	var rowSet = this.rowsData[x];
	//获取第几行下的第几列
	return rowSet[y];
}