
$(document).ready(function(){
	$('.choice').click(function(){
		$(this).toggleClass('no');
		$(this).toggleClass('yes');

		if($(this).hasClass('no')){
			$('.' + $(this).attr('choice') + '-no').attr('checked',true);
			$('.' + $(this).attr('choice') + '-hide').hide(500);
		}
		if($(this).hasClass('yes')){
			$('.' + $(this).attr('choice') + '-yes').attr('checked',true);	
			$('.' + $(this).attr('choice') + '-hide').show(500);
		}
	});

	$('input:checkbox').click(function(){
		var me = $(this);
		if(me.attr('toggle')){
			$(me.attr('toggle')).toggle(500);
		}
		if(me.is(':checked'))
			$('.' + me.attr('choice') + '-yes').attr('checked',true);
		else
			$('.' + me.attr('choice') + '-no').attr('checked',true);	


	});

	$('input[placeholder], textarea[placeholder]').placeholder();
});



var onSubmit = function(){
	var required = $('input[required]');
	var success = true;
	for(var i=0; i<required.length; i++){
		if($(required[i]).val().length == 0)
			success = false;
	}
	if(success){
		$('#signup').hide(500, function(){
			$('.success').show(500);
		});
	}
	else{
		$('#signup').hide(500, function(){
			$('.failure').show(500, function(){
				setTimeout(function() {
					$('.failure').hide(500, function(){
						$('#signup').show(500);
					});
				}, 2000);
			});
		});
	}
}

var again = function(){
	$('textarea').val('');
	$('.required, .optional').val('');
	$('.success').hide(500, function(){
		$('#signup').show(500);
	})
}