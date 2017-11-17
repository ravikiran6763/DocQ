//
//  WebViewController.swift
//  DoctorQuick
//
//  Created by Amit Tantia on 30/10/17.
//

import Foundation
import UIKit
import WebKit



class WebViewController: CDVViewController {

    let webV:UIWebView? = nil;
     var window: UIWindow?;

    override func viewDidLoad() {
        super.viewDidLoad()


        }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()

    }


    func viewWillAppear() {


        var viewController = CDVViewController();

        viewController.startPage = "index.html";

        var navRootViewController: UIViewController? = window?.rootViewController

        navRootViewController?.addChildViewController(viewController)

        navRootViewController?.view.addSubview(viewController.view)

        self.navigationController?.navigationBar.isHidden = true;

        self.window?.rootViewController = self.navigationController;



    }

    func viewWillDisappear()
    {
      self.navigationController?.popViewController(animated: true);

        self.navigationController?.navigationBar.isHidden = false;



    }


}
