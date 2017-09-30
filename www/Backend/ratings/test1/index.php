<!DOCTYPE html>
<html class="ng-scope" ng-app=""><head>
        <meta content="text/html; charset=UTF-8" http-equiv="Content-Type">

        <title>Rate Me</title>
        <style type="text/css">.main {
                width: 900px;
                margin: 0 auto;
                height: 700px;
                border: 1px solid #ccc;
                padding: 20px;
            }

            /*.header{
                height: 100px;
            }*/
            .content{
                height: 700px;
                border-top: 1px solid #ccc;
                padding-top: 15px;
            }
            .footer{
                height: 100px;
                bottom: 0px;
            }
            .heading{
                color: #FF5B5B;
                margin: 10px 0;
                padding: 10px 0;
                font-family: trebuchet ms;
            }

            #dv1, #dv0{
                width: 408px;
                border: 1px #ccc solid;
                padding: 15px;
                margin: auto;

            }

            /*downloaded from http://devzone.co.in*/
        </style>
        <style>
            /****** Rating Starts *****/
            @import url(http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);

            fieldset, label { margin: 0; padding: 0; }
            body{
               margin: 20px;
               background: #e2e2e2;
             }
            h1 { font-size: 1.5em; margin: 10px; }

            .rating {
                border: none;
                float: left;
            }

            .rating > input { display: none; }
            .rating > label:before {
                margin: 5px;
                font-size: 1.25em;
                font-family: FontAwesome;
                display: inline-block;
                content: "\f005";
            }

            .rating > .half:before {
                content: "\f089";
                position: absolute;
            }

            .rating > label {
                color: #ddd;
                float: right;
            }

            .rating > input:checked ~ label,
            .rating:not(:checked) > label:hover,
            .rating:not(:checked) > label:hover ~ label { color: #FFD700;  }

            .rating > input:checked + label:hover,
            .rating > input:checked ~ label:hover,
            .rating > label:hover ~ input:checked ~ label,
            .rating > input:checked ~ label:hover ~ label { color: #FFED85;  }


            /* Downloaded from http://devzone.co.in/ */
        </style>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

        <script src="index_files/ca-pub-2074772727795809.js" type="text/javascript" async=""></script>
        <script src="index_files/analytics.js" async=""></script>

    </head>
    <body>

        <!-- ad1 start -->

        <!-- ad1 end http://DevZone.co.in-->

        <div class="main">
            <div class="header"><a href="http://doctorQuick.com/" title="Doctoruick"><img  src="index_files/icon.png"></a></div>


            <div class="content">

                    <!-- Demo 2 start -->
                    <h1>Rate a Doctor</h1>
                    <script>
                        $(document).ready(function () {
                            $("#demo2 .stars").click(function () {
                                alert($(this).val());
                                $(this).attr("checked");
                            });
                        });
                    </script>
                    <fieldset id='demo2' class="rating">
                        <input class="stars" type="radio" id="star5" name="rating" value="5" />
                        <label class = "full" for="star5" title="Awesome - 5 stars"></label>
                        <input class="stars" type="radio" id="star4half" name="rating" value="4.5" />
                        <label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
                        <input class="stars" type="radio" id="star4" name="rating" value="4" />
                        <label class = "full" for="star4" title="Pretty good - 4 stars"></label>
                        <input class="stars" type="radio" id="star3half" name="rating" value="3.5" />
                        <label class="half" for="star3half" title="Meh - 3.5 stars"></label>
                        <input class="stars" type="radio" id="star3" name="rating" value="3" />
                        <label class = "full" for="star3" title="Meh - 3 stars"></label>
                        <input class="stars" type="radio" id="star2half" name="rating" value="2.5" />
                        <label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
                        <input class="stars" type="radio" id="star2" name="rating" value="2" />
                        <label class = "full" for="star2" title="Kinda bad - 2 stars"></label>
                        <input class="stars" type="radio" id="star1half" name="rating" value="1.5" />
                        <label class="half" for="star1half" title="Meh - 1.5 stars"></label>
                        <input class="stars" type="radio" id="star1" name="rating" value="1" />
                        <label class = "full" for="star1" title="Sucks big time - 1 star"></label>
                        <input class="stars" type="radio" id="starhalf" name="rating" value="0.5" />
                        <label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
                    </fieldset>
                    <!-- Demo 2 end -->

                    <div id='feedback'></div>

                    <!-- Demo 3 end -->

<div style='clear:both;'></div>
                </div>

            </div>
          </div>
          <?php

                require 'headers.php';
                header('Content-type: text/html; charset=utf-8');
                $postdata = file_get_contents("php://input");

                if (isset($postdata))
                {

                    // $loginphno = json_decode($postdata);
                    $doctorDetails = array();
                    $sql = "select docImage2,doctorFname,doctorMname,doctorLname,doctorDegrees,practicingSince,doctorAge,doctorSex,doctorCountry,doctorCity,ratings,ratingCount from doctorDetails,doctorImages,doctor_onoff where doctorPhone='9844992181' and doctorImages.docPhone=doctorDetails.doctorPhone and  doctorDetails.doctorPhone=doctor_onoff.doctor_phno";
                    $retval = mysql_query( $sql, $dbhandle );
                    while($row = mysql_fetch_array($retval))
                    {
                      $doctorDetails[] = $row;

                    }

                    if(! $retval )
                    {
                      die('Could not get data: ' . mysql_error());
                    }
                     echo json_encode($doctorDetails);
                }
                mysql_close($dbhandle);

          ?>
          $myArray = json_decode($myString);


    </body></html>
