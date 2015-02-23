angular.module('components', []) // สร้าง module ชื่อ components
  .directive('tabs', function() { //กำหนดรูปแบบของแท็ก tabs
    return {  // สงค่ากลับเมื่อกำหนดรูปแบบแล้ว
      restrict: 'E', // กำหนดรูปแบบของแท็กเป็น E หรือคล้าย element เช่น <tabs></tabs>
	  // A attributes ,C css class, M comment
      transclude: true, // กำหนดให้สามารถแทนที่ ข้อมูลที่กำหนดด้วย ng-transclude ได้
      scope: {}, // กำหนด isolate scope ใช้แทน scope หลัก 
      controller: function($scope, $element) { // สรัาง controller ให้ tabs
        var panes = $scope.panes = []; // เมื่อเริ่มเรียกใช้ กำหนดให้เป็น array ว่าง
	//	console.log("ลำดับทำงานที่ 1");
        $scope.select = function(pane) { // กำหนดฟังก์ชั่น select ให้ controller
		// console.log("ลำดับทำงานที่ 4");
          angular.forEach(panes, function(pane) { // วนลูปการ tabs ทั้งหมด
            pane.selected = false; // กำหนดให้ค่า การถูกเลือก เป็น false ทุกอันก่อน
          });
          pane.selected = true; // แล้วกำหนด tabs ที่เลือก ให้เป็น true
        }
 
        this.addPane = function(pane) {// กำหนดฟังก์ชั่น addPane ให้ controller
		//	console.log("ลำดับทำงานที่ 3 จะมีสองรอบ");
          if (panes.length == 0) $scope.select(pane); // ไปทำงานตรงนี้ก่อน เนื่องจากเริ่มต้นกำหนด array ว่าง
		//  console.log("ลำดับทำงานที่ 5 จะมีสองรอบ");
          panes.push(pane);   // เพิ่มค่า array 
        }
      },
      template: // template สำหรับแสดง tabs
        '<div class="tabbable">' +
          '<ul class="nav nav-tabs" role="tablist">' + // รูปแบบ css tabs ของ bootstrap
            '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">'+ // วนลูปสร้าง tabs แสดงถ้าถูกเลือก
              '<a href="" ng-click="select(pane)">{{pane.title}}</a>' + // แสดงหัวข้อ tabs ถ้าคลิก ให้ถูกเลือก
            '</li>' +
          '</ul>' +
          '<div class="tab-content" ng-transclude></div>' + //เนื้อหาจากแท็ก pane ที่ compile แล้ว จะมาแทรกส่วนนี้
        '</div>',
      replace: true // ให้ไปแทนที่แท็ก <tabs>
    };
  })
 
  .directive('pane', function() { //กำหนดรูปแบบของแท็ก pane
    return { // สงค่ากลับเมื่อกำหนดรูปแบบแล้ว
      require: '^tabs', // เรียกใช้งาน tabs directive ผ่าน link ฟังก์ชั่นด้านล่าง
      restrict: 'E', // กำหนดรูปแบบของแท็กเป็น E หรือคล้าย element เช่น <tabs></tabs>
	  // A attributes ,C css class, M comment
      transclude: true, // กำหนดให้สามารถแทนที่ ข้อมูลที่กำหนดด้วย ng-transclude ได้
      scope: { title: '@' }, // กำหนด isolate scope และมีการส่งค่า title ของ pane ไปใช้งานใน template 
      link: function(scope, element, attrs, tabsCtrl) {// ส่งค่าที่จะเป็นไป complie สร้าง html 
	//		console.log("ลำดับทำงานที่ 2 จะมีสองรอบ");
		// tabsCtrl  คือ controller ของ tabs ที่ถูกเรียกใช้งานจาก require 
		// จะมีการส่งค่าไปสองครั้ง คือ ตามจำนวนของ pane 
        tabsCtrl.addPane(scope); // ใช้งาน controller ของ tabs เรียกใช้ฟังก์ชั่น addPane
      },
      template: // template นี้จะถูกแทรกเข้าไปในส่วนของ ng-transclude ของ tabs 
        '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' + // สำหรับนำข้อมูลในแท็ก pane มาแทรกในนี้อีกที
        '</div>',
      replace: true // ให้ไปแทนที่แท็ก <pane>
    };
  })