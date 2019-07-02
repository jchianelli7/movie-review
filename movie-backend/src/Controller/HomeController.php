<?php
/**
 * Created by PhpStorm.
 * User: joshchianelli
 * Date: 7/1/19
 * Time: 6:50 PM
 */
namespace App\Controller;

use App\Entity\Movie;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    /**
     * @Route("/", name="homepage")
     */
    public function index()
    {
        $movies = $this->getDoctrine()
            ->getRepository(Movie::class);


        return $this->render('/base.html.twig', [
            'movies' => $movies,
        ]);
    }
}