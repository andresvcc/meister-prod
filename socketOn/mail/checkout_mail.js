// email pour confirmer compte

const URL = 'https://meister-engineering.ch';

const parseUrl = (photo) => {
  const str = photo;
  return str.split(' ').join('%20');
};

const parseName = (name) => {
  const productName = name;
  return productName.substring(0, productName.length - 2);
};

const noSize = (size) => {
  const noSize = size;
  if (noSize === ' ') {
    return 'None';
  }
  return noSize;
};

const subtotal = (total, tva) => {
  const subtotalPrix = (total - tva);
  return subtotalPrix;
};

const checkoutMail = ({ data, userId }) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head> 
<meta charset="UTF-8"> 
<meta content="width=device-width, initial-scale=1" name="viewport"> 
<meta name="x-apple-disable-message-reformatting"> 
<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
<meta content="telephone=no" name="format-detection"> 
<title>Action - Order Confirmation invoice</title> 
<!--[if (mso 16)]>
<style type="text/css">
a {text-decoration: none;}
</style>
<![endif]--> 
<!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--> 
<!--[if gte mso 9]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG></o:AllowPNG>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]--> 
<style type="text/css">
#outlook a {
padding:0;
}
.es-button {
mso-style-priority:100!important;
text-decoration:none!important;
}
a[x-apple-data-detectors] {
color:inherit!important;
text-decoration:none!important;
font-size:inherit!important;
font-family:inherit!important;
font-weight:inherit!important;
line-height:inherit!important;
}
.es-desk-hidden {
display:none;
float:left;
overflow:hidden;
width:0;
max-height:0;
line-height:0;
mso-hide:all;
}
[data-ogsb] .es-button {
border-width:0!important;
padding:10px 20px 10px 20px!important;
}
@media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1 { font-size:30px!important; text-align:center; line-height:120%!important } h2 { font-size:26px!important; text-align:center; line-height:120%!important } h3 { font-size:20px!important; text-align:center; line-height:120%!important } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-menu td a { font-size:16px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-width:10px 0px 10px 0px!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } }
</style> 
</head> 
<body style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"> 
<div class="es-wrapper-color" style="background-color:#F6F6F6"> 
<!--[if gte mso 9]>
<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
<v:fill type="tile" color="#f6f6f6"></v:fill>
</v:background>
<![endif]--> 
<table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"> 
<tr> 
<td valign="top" style="padding:0;Margin:0"> 
<table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"> 
<tr> 
<td align="center" style="padding:0;Margin:0"> 
<table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#efefef;width:600px" cellspacing="0" cellpadding="0" bgcolor="#efefef" align="center"> 
<tr> 
<td align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:20px;padding-right:20px"> 
<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td style="padding:0;Margin:0;font-size:0px" align="center"><a target="_blank" href="https://meister-engineering.com" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img src="https://lhvaxt.stripocdn.email/content/guids/CABINET_8ce5545853f93b642159ab54d30b64d2/images/81571620120629001.png" alt="Meister Engineering SA" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" title="Meister Engineering SA" width="160"></a></td> 
</tr> 
<tr> 
<td style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0" align="center"> 
<table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:none;height:1px;width:100%;margin:0px"></td> 
</tr> 
</table></td> 
</tr> 
<tr> 
<td align="center" style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><span style="font-family:georgia, times, 'times new roman', serif;font-size:16px"><strong>It's ordered !</strong></span><br><br>Your order has been received.<br><br>Order #: ${data.key}<br>Order date: ${data.value.date}<br>Estimated delivery date: ${data.value.estimatedShippingDelay}</p></td> 
</tr> 
<tr> 
<td style="Margin:0;padding-top:5px;padding-left:20px;padding-right:20px;padding-bottom:30px;font-size:0" align="center"> 
<table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:none;height:1px;width:100%;margin:0px"></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
<tr> 
<td style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:40px;background-color:#ffffff" bgcolor="#ffffff" align="left"> 
<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td valign="top" align="center" style="padding:0;Margin:0;width:540px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td bgcolor="#ffffff" align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:georgia, times, 'times new roman', serif;line-height:24px;color:#333333;font-size:16px"><strong>Your Order: </strong></p></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
<tr> 
<td style="padding:0;Margin:0;padding-left:20px;padding-right:20px;background-color:#ffffff" bgcolor="#ffffff" align="left"> 
<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0" bgcolor="#ffffff" align="center"> 
<table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:none;height:1px;width:100%;margin:0px"></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
<tr> 
<td style="Margin:0;padding-top:15px;padding-bottom:15px;padding-left:40px;padding-right:40px;background-color:#ffffff" bgcolor="#ffffff" align="left"> 
<!--[if mso]><table style="width:520px" cellpadding="0" cellspacing="0"><tr><td style="width:156px" valign="top"><![endif]--> 
<table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
<tr> 
<td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:156px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
</tr> 
</table></td> 
</tr> 
</table> 

<!--[if mso]></td></tr></table><![endif]--></td> 
</tr> 
<tr> 
<td style="Margin:0;padding-top:15px;padding-bottom:15px;padding-left:40px;padding-right:40px;background-color:#ffffff" bgcolor="#ffffff" align="left"> 
<!--[if mso]><table style="width:520px" cellpadding="0" cellspacing="0"><tr><td style="width:156px" valign="top"><![endif]--> 
<table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
<tr> 
<td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:156px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
</tr> 
</table></td> 
</tr> 
</table> 


<!--[if mso]></td><td style="width:20px"></td><td style="width:344px" valign="top"><![endif]--> 
${data.value.products.map((val, i) => `





<table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="esd-email-paddings" valign="top">
<table class="esd-footer-popover es-content" cellspacing="0" cellpadding="0" align="center">
<tbody>
<tr>
<td class="esd-stripe" align="center">
<table class="es-content-body" style="background-color: #efefef;" width="600" cellspacing="0" cellpadding="0" bgcolor="#efefef" align="center">
<tbody>
<tr>
<td class="esd-structure es-p15t es-p15b es-p40r es-p40l" style="background-color: #ffffff;" bgcolor="#ffffff" align="left">
<!--[if mso]><table width="520" cellpadding="0" cellspacing="0"><tr><td width="156" valign="top"><![endif]-->
<table class="es-left" cellspacing="0" cellpadding="0" align="left">
<tbody>
<tr>
<td class="es-m-p0r es-m-p20b esd-container-frame" width="156" valign="top" align="center">
<table width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="esd-block-image" style="font-size: 0px;" align="center"><a target="_blank">
<img alt="logo" title="Logo" width="120px" src="${URL}${parseUrl(val.photo)}" style="display:block; width: 100px; height: 80px; max-width: 70px; max-height: 70px; object-fit: cover; " />
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<!--[if mso]></td><td width="20"></td><td width="344" valign="top"><![endif]-->
<table cellspacing="0" cellpadding="0" align="right">
<tbody>
<tr>
<td class="esd-container-frame" width="344" align="left">
<table width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="esd-block-text" align="left">
<p style="font-size: 11px;"><strong><span style="font-family:georgia,times,'times new roman',serif;">${parseName(val.name)}<br>Price: ${val.currency}${' '}${val.price}</span></strong><br>
<span style="font-size:11px;">Size: ${noSize(val.sizeName)}<br>

<span style="font-size:11px;">Color: ${val.colorName}<br>Quantity: ${val.qty}</span></p>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>


`).join(' ')}

<!--[if mso]></td></tr></table><![endif]--></td> 
</tr> 
<tr> 
<td style="padding:0;Margin:0;padding-left:20px;padding-right:20px;background-color:#ffffff" bgcolor="#ffffff" align="left"> 
<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0" bgcolor="#ffffff" align="center"> 
<table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:none;height:1px;width:100%;margin:0px"></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
<tr> 
<td style="Margin:0;padding-bottom:5px;padding-top:10px;padding-left:40px;padding-right:40px;background-color:#ffffff" bgcolor="#ffffff" align="left"> 
<!--[if mso]><table style="width:520px" cellpadding="0" cellspacing="0"><tr><td style="width:247px" valign="top"><![endif]--> 
<table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
<tr> 
<td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:247px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:12px">TVA: ${data.value.currency}${' '}${parseFloat(data.value.TVA).toFixed(2)}</p>        Subtotal: ${data.value.currency}${' '}${parseFloat(subtotal(data.value.payment.pay, data.value.TVA)).toFixed(2)}
<br> Shipping Cost: ${data.value.currency}${' '}${parseFloat(data.value.shippingCost).toFixed(2)}

</td> 
</tr> 
</table></td> 
</tr> 
</table> 
<!--[if mso]></td><td style="width:20px"></td><td style="width:253px" valign="top"><![endif]--> 
<table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
<tr> 
<td align="left" style="padding:0;Margin:0;width:253px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
</tr> 
</table></td> 
</tr> 
</table> 
<!--[if mso]></td></tr></table><![endif]--></td> 
</tr> 
<tr> 
<td style="Margin:0;padding-top:5px;padding-bottom:10px;padding-left:40px;padding-right:40px;background-color:#ffffff" bgcolor="#ffffff" align="left"> 
<!--[if mso]><table style="width:520px" cellpadding="0" cellspacing="0"><tr><td style="width:247px" valign="top"><![endif]--> 
<table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
<tr> 
<td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:247px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
</tr> 
</table></td> 
</tr> 
</table> 
<!--[if mso]></td><td style="width:20px"></td><td style="width:253px" valign="top"><![endif]--> 
<table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
<tr> 
<td align="left" style="padding:0;Margin:0;width:253px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
</tr> 
</table></td> 
</tr> 
</table> 
<!--[if mso]></td></tr></table><![endif]--></td> 
</tr> 
<tr> 
<td style="padding:0;Margin:0;padding-left:20px;padding-right:20px;background-color:#ffffff" bgcolor="#ffffff" align="left"> 
<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0" bgcolor="#ffffff" align="center"> 
<table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:none;height:1px;width:100%;margin:0px"></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
<tr> 
<td style="Margin:0;padding-top:5px;padding-bottom:20px;padding-left:40px;padding-right:40px;background-color:#ffffff" bgcolor="#ffffff" align="left"> 
<!--[if mso]><table style="width:520px" cellpadding="0" cellspacing="0"><tr><td style="width:247px" valign="top"><![endif]--> 
<table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"> 
<tr> 
<td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:247px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><strong>Total: ${data.value.currency}${' '}${parseFloat(data.value.payment.pay).toFixed(2)}</strong><br></p></td> 
</tr> 
</table></td> 
</tr> 
</table> 
<!--[if mso]></td><td style="width:20px"></td><td style="width:253px" valign="top"><![endif]--> 
<table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"> 
<tr> 
<td align="left" style="padding:0;Margin:0;width:253px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
</tr> 
</table></td> 
</tr> 
</table> 
<!--[if mso]></td></tr></table><![endif]--></td> 
</tr> 
<tr> 
<td align="left" style="padding:0;Margin:0"> 
<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td valign="top" align="center" style="padding:0;Margin:0;width:600px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td style="padding:20px;Margin:0;font-size:0" align="center"> 
<table width="5%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td style="padding:0;Margin:0;border-bottom:0px solid #efefef;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
<tr> 
<td style="padding:0;Margin:0;background-color:#ffffff" bgcolor="#ffffff" align="left"> 
<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td valign="top" align="center" style="padding:0;Margin:0;width:600px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td bgcolor="#ffffff" align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:40px;padding-right:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:georgia, times, 'times new roman', serif;line-height:24px;color:#333333;font-size:16px"><strong>Shipping Details</strong></p></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
<tr> 
<td style="padding:0;Margin:0;padding-left:20px;padding-right:20px;background-color:#ffffff" bgcolor="#ffffff" align="left"> 
<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0" bgcolor="#ffffff" align="center"> 
<table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:none;height:1px;width:100%;margin:0px"></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
<tr> 
<td style="Margin:0;padding-top:5px;padding-bottom:20px;padding-left:40px;padding-right:40px;background-color:#ffffff" bgcolor="#ffffff" align="left"> 
<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td valign="top" align="center" style="padding:0;Margin:0;width:520px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td bgcolor="#ffffff" align="left" style="padding:0;Margin:0;padding-bottom:5px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">Name:  ${data.value.fname} ${data.value.lname}<br>Address: ${data.value.billingAddress}, ${data.value.billingZipCode}, ${data.value.billingZipArea}, ${data.value.billingCountry}<br><br>Email: ${data.value.email}</p></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
<tr> 
<td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px"> 
<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td style="padding:20px;Margin:0;font-size:0" align="center"> 
<table width="5%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td style="padding:0;Margin:0;border-bottom:0px solid #efefef;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
<tr> 
<td style="padding:0;Margin:0;padding-top:20px;padding-right:20px;padding-left:40px;background-color:#ffffff" bgcolor="#ffffff" align="left"> 
<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td valign="top" align="center" style="padding:0;Margin:0;width:540px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td bgcolor="#ffffff" align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:georgia, times, 'times new roman', serif;line-height:24px;color:#333333;font-size:16px"><strong>Payment Details</strong></p></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
<tr> 
<td style="padding:0;Margin:0;padding-left:20px;padding-right:20px;background-color:#ffffff" bgcolor="#ffffff" align="left"> 
<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px;font-size:0" bgcolor="#ffffff" align="center"> 
<table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:none;height:1px;width:100%;margin:0px"></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
<tr> 
<td style="Margin:0;padding-top:5px;padding-bottom:20px;padding-left:40px;padding-right:40px;background-color:#ffffff" bgcolor="#ffffff" align="left"> 
<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td valign="top" align="center" style="padding:0;Margin:0;width:520px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td bgcolor="#ffffff" align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"> Total: ${data.value.currency}${' '}${parseFloat(data.value.payment.pay).toFixed(2)}<br></p></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
<tr> 
<td align="left" style="Margin:0;padding-bottom:15px;padding-top:20px;padding-right:20px;padding-left:25px"> 
<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td valign="top" align="center" style="padding:0;Margin:0;width:555px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td align="center" style="padding:0;Margin:0"><span class="es-button-border" style="border-style:solid;border-color:#18374c;background:#18374c;border-width:0px 0px 2px 0px;display:inline-block;border-radius:0px;width:auto"><a href="${URL}/checkout/step5?idBilling=${data.key}&userMail=${userId}" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:14px;border-style:solid;border-color:#18374c;border-width:10px 20px 10px 20px;display:inline-block;background:#18374c;border-radius:0px;font-family:georgia, times, 'times new roman', serif;font-weight:normal;font-style:normal;line-height:17px;width:auto;text-align:center">Dowload Invoice PDF</a></span></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
<tr> 
<td style="padding:0;Margin:0;padding-left:20px;padding-right:20px;background-color:#efefef" bgcolor="#efefef" align="left"> 
<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td style="Margin:0;padding-top:5px;padding-bottom:5px;padding-left:20px;padding-right:20px;font-size:0" align="center"> 
<table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td style="padding:0;Margin:0;border-bottom:1px solid #cccccc;background:none;height:1px;width:100%;margin:0px"></td> 
</tr> 
</table></td> 
</tr> 
<tr> 
<td align="center" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><a target="_blank" href="http://www.meister-engineering.com" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#18374c;font-size:12px">www.meister-engineering.com</a><br><br>To get the latest news, follow us on social media! ;)<br></p></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
<tr> 
<td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px"> 
<table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td valign="top" align="center" style="padding:0;Margin:0;width:560px"> 
<table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td style="padding:0;Margin:0;padding-top:5px;padding-bottom:5px;font-size:0" align="center"> 
<table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"> 
<tr> 
<td valign="top" align="center" style="padding:0;Margin:0;padding-right:10px"><a target="_blank" href="https://www.facebook.com/meisterengineering" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img src="https://lhvaxt.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Fb" title="Facebook" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
<td valign="top" align="center" style="padding:0;Margin:0"><a target="_blank" href="https://www.instagram.com/meisterengineering/" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#2CB543;font-size:14px"><img src="https://lhvaxt.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Ig" title="Instagram" width="32" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td> 
</tr> 
</table></td> 
</tr> 
<tr> 
<td align="center" style="padding:0;Margin:0;padding-top:15px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:helvetica, 'helvetica neue', arial, verdana, sans-serif;line-height:14px;color:#696969;font-size:9px">If you have any questions, you can contact us at moto@meister-engineering.com<br></p></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
</table></td> 
</tr> 
</table> 
</div> 

</body>
</html>
`;
module.exports = checkoutMail;
