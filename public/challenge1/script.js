
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
			if(me.is(':checked')){
				$(me.attr('toggle')).show(500);
			}
			else
				$(me.attr('toggle')).hide(500);
		}
		if(me.is(':checked'))
			$('.' + me.attr('choice') + '-yes').attr('checked',true);
		else
			$('.' + me.attr('choice') + '-no').attr('checked',true);	
	});

	$('.needed_for_point').click(function(){
		if($('.needed_for_point').find('input:checked').length > 0){
			$('.point').prop('checked', true);
		}
		else{
			$('.point').prop('checked', false);
		}
	});
});



var onSubmit = function(){
	var required = $('.required');
	var success = true;
	for(var i=0; i<required.length; i++){
		if($(required[i]).val().length == 0)
			success = false;
	}
	if($('[name="entry.8.group"]:checked').length == 0)
		success = false;
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
	$('[name="entry.8.group"]').prop('checked',false);
	$('.success').hide(500, function(){
		$('#signup').show(500);
	})
}